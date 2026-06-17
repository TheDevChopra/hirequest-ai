'use client';

import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Plus, MoreHorizontal, Calendar, Building, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';
import { getApplications, reorderApplications } from '@/actions/applications';

type Application = {
  id: string;
  company: string;
  roleTitle: string;
  location: string | null;
  status: string;
  boardOrder: number;
  createdAt: Date;
};

type ColumnData = {
  id: string;
  title: string;
  items: Application[];
};

const columnDefinitions = [
  { id: 'interested', title: 'Interested' },
  { id: 'applied', title: 'Applied' },
  { id: 'interview', title: 'Interview' },
  { id: 'offer', title: 'Offer' },
  { id: 'rejected', title: 'Rejected' }
];

export default function ApplicationTracker() {
  const [columns, setColumns] = useState<ColumnData[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchApps = async () => {
    try {
      const dbApps = await getApplications();
      
      const cols: ColumnData[] = columnDefinitions.map(def => ({
        id: def.id,
        title: def.title,
        items: dbApps.filter(app => app.status === def.id).sort((a, b) => a.boardOrder - b.boardOrder)
      }));
      
      setColumns(cols);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    fetchApps();
  }, []);

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    // Clone data
    const newColumns = Array.from(columns);
    const sourceColIndex = newColumns.findIndex(c => c.id === source.droppableId);
    const destColIndex = newColumns.findIndex(c => c.id === destination.droppableId);
    
    const sourceCol = newColumns[sourceColIndex];
    const destCol = newColumns[destColIndex];

    const sourceItems = Array.from(sourceCol.items);
    const destItems = source.droppableId === destination.droppableId ? sourceItems : Array.from(destCol.items);

    const [movedItem] = sourceItems.splice(source.index, 1);
    movedItem.status = destination.droppableId;
    destItems.splice(destination.index, 0, movedItem);

    // Update local state immediately for snappy UI
    newColumns[sourceColIndex] = { ...sourceCol, items: sourceItems };
    if (source.droppableId !== destination.droppableId) {
      newColumns[destColIndex] = { ...destCol, items: destItems };
    }
    setColumns(newColumns);

    // Prepare updates for DB
    const updates: { id: string, boardOrder: number, status?: string }[] = [];
    
    destItems.forEach((item, index) => {
      updates.push({ id: item.id, boardOrder: index, status: destination.droppableId });
    });
    
    if (source.droppableId !== destination.droppableId) {
      sourceItems.forEach((item, index) => {
        updates.push({ id: item.id, boardOrder: index, status: source.droppableId });
      });
    }

    // Send updates to DB
    await reorderApplications(updates);
  };

  if (!isMounted) return <div style={{ padding: '2rem' }}>Loading Tracker...</div>;

  return (
    <div style={{ height: 'calc(100vh - 6rem)', display: 'flex', flexDirection: 'column' }}>
      <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>Application Tracker</h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage your job search pipeline.</p>
        </div>
        <button className="btn btn-primary"><Plus size={16} /> Add Application</button>
      </header>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
           <RefreshCw size={32} color="var(--accent-blue)" className="spin" />
        </div>
      ) : (
        <div style={{ flexGrow: 1, overflowX: 'auto', display: 'flex', gap: '1.5rem', paddingBottom: '1rem' }}>
          <DragDropContext onDragEnd={onDragEnd}>
            {columns.map(column => (
              <div key={column.id} style={{ minWidth: '320px', width: '320px', background: 'var(--sidebar-bg)', borderRadius: '12px', padding: '1rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', padding: '0 0.5rem' }}>
                  <h3 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                    {column.title} <span style={{ background: 'var(--border-color)', color: 'var(--text-main)', padding: '0.1rem 0.5rem', borderRadius: '12px', marginLeft: '0.5rem', fontSize: '0.75rem' }}>{column.items.length}</span>
                  </h3>
                  <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><MoreHorizontal size={16} /></button>
                </div>

                <Droppable droppableId={column.id}>
                  {(provided) => (
                    <div 
                      {...provided.droppableProps} 
                      ref={provided.innerRef}
                      style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem', minHeight: '100px' }}
                    >
                      {column.items.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="card"
                              style={{ 
                                ...provided.draggableProps.style,
                                padding: '1.25rem',
                                cursor: 'grab',
                                boxShadow: snapshot.isDragging ? '0 10px 25px rgba(0,0,0,0.1)' : '0 1px 3px rgba(0,0,0,0.02)',
                                transform: snapshot.isDragging ? `${provided.draggableProps.style?.transform} scale(1.02)` : provided.draggableProps.style?.transform,
                                border: snapshot.isDragging ? '1px solid var(--accent-blue)' : '1px solid var(--border-color)'
                              }}
                            >
                              <h4 style={{ margin: '0 0 0.35rem 0', fontSize: '1.05rem', fontWeight: 600 }}>{item.roleTitle}</h4>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                                <Building size={14} color="var(--text-muted)" /> {item.company}
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                                <span>{item.location}</span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Calendar size={12} /> {format(new Date(item.createdAt), 'MMM d')}</span>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </DragDropContext>
        </div>
      )}
    </div>
  );
}
