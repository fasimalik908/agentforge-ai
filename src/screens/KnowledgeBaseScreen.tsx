import React, { useState } from 'react';
import { 
  UploadCloud, 
  FileText, 
  Database, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  Trash2, 
  Eye, 
  X, 
  Search, 
  Copy, 
  Check 
} from 'lucide-react';
import { INITIAL_DOCUMENTS, VECTOR_STORE_INFO } from '../data/mockData';
import { DocumentItem } from '../types';
import { useToast } from '../components/Toast';

export const KnowledgeBaseScreen: React.FC = () => {
  const { addToast } = useToast();
  const [documents, setDocuments] = useState<DocumentItem[]>(INITIAL_DOCUMENTS);
  const [search, setSearch] = useState('');
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);

  const filteredDocs = documents.filter(doc => 
    doc.name.toLowerCase().includes(search.toLowerCase())
  );

  const getFileTypeBadge = (type: string) => {
    if (type === 'pdf') {
      return (
        <span className="w-8 h-8 rounded-[6px] bg-[#FEE4E2] text-[#D92D20] flex items-center justify-center font-bold text-[10px] uppercase shrink-0">
          PDF
        </span>
      );
    }
    if (type === 'docx') {
      return (
        <span className="w-8 h-8 rounded-[6px] bg-[#E0EAFF] text-[#3538CD] flex items-center justify-center font-bold text-[10px] uppercase shrink-0">
          DOC
        </span>
      );
    }
    return (
      <span className="w-8 h-8 rounded-[6px] bg-[#F2F4F7] text-[#344054] flex items-center justify-center font-bold text-[10px] uppercase shrink-0">
        MD
      </span>
    );
  };

  const reindexDoc = (id: string, name: string) => {
    setDocuments(prev => prev.map(doc => {
      if (doc.id === id) {
        return { ...doc, status: 'processing', progress: 85 };
      }
      return doc;
    }));
    addToast('Re-indexing started', name, 'info');

    setTimeout(() => {
      setDocuments(prev => prev.map(doc => {
        if (doc.id === id) {
          return { ...doc, status: 'indexed', progress: undefined, lastUpdated: 'Just now' };
        }
        return doc;
      }));
      addToast('Indexed successfully', name, 'success');
    }, 1200);
  };

  const deleteDoc = (id: string, name: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
    addToast('Document deleted', name, 'info');
  };

  return (
    <div className="space-y-5">
      {/* Top Banner & Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Upload Drop Area - Clean light border, subtle dashed line */}
        <div 
          onClick={() => {
            const newDoc: DocumentItem = {
              id: `doc_${Date.now()}`,
              name: 'Q3_Operations_Audit_2026.pdf',
              size: '4.2 MB',
              pages: 18,
              chunks: 310,
              status: 'indexed',
              lastUpdated: 'Just now',
              type: 'pdf',
              previewChunks: [
                {
                  id: 'chk_new',
                  chunkIndex: 1,
                  text: 'Audit Findings: Automated response verification passed all compliance checks...',
                  tokens: 164,
                  similarityScore: 0.95
                }
              ]
            };
            setDocuments([newDoc, ...documents]);
            addToast('Document uploaded', newDoc.name, 'success');
          }}
          className="lg:col-span-2 p-6 bg-white rounded-[10px] border border-dashed border-[#D0D5DD] hover:border-[#3B5BFF] transition-colors flex flex-col items-center justify-center text-center cursor-pointer card-shadow"
        >
          <div className="w-10 h-10 rounded-[8px] bg-[#F5F6F8] text-[#3B5BFF] flex items-center justify-center mb-2">
            <UploadCloud className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-semibold text-[#101828] mb-0.5">
            Upload documents to knowledge base
          </h3>
          <p className="text-xs text-[#667085] mb-3">
            PDF, DOCX, or Markdown up to 100MB
          </p>
          <button className="px-3 py-1.5 bg-white border border-[#E4E7EC] hover:bg-[#F9FAFB] text-[#344054] rounded-[8px] text-xs font-medium shadow-xs">
            Choose file
          </button>
        </div>

        {/* Vector Store Info & Retrieval Quality */}
        <div className="space-y-3.5">
          {/* Vector Store Card */}
          <div className="p-4 bg-white rounded-[10px] border border-[#E4E7EC] card-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#101828]">Qdrant vector store</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#12B76A]" />
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-[#F9FAFB] p-2 rounded-[8px] border border-[#EAECF0]">
                <span className="text-[10px] text-[#667085] block">Chunks</span>
                <span className="font-semibold text-[#101828] tabular-nums">
                  {documents.reduce((acc, d) => acc + d.chunks, 0).toLocaleString()}
                </span>
              </div>
              <div className="bg-[#F9FAFB] p-2 rounded-[8px] border border-[#EAECF0]">
                <span className="text-[10px] text-[#667085] block">Dimensions</span>
                <span className="font-semibold text-[#101828] tabular-nums">
                  {VECTOR_STORE_INFO.dimensions}d
                </span>
              </div>
            </div>
          </div>

          {/* Retrieval Quality Card with Mini Bar Distribution */}
          <div className="p-4 bg-white rounded-[10px] border border-[#E4E7EC] card-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#101828]">Retrieval precision</span>
              <span className="text-xs font-semibold text-[#12B76A] tabular-nums">{VECTOR_STORE_INFO.mrrScore}%</span>
            </div>

            {/* Clean Mini Bar representation */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] text-[#667085]">
                <span>Top-1 match</span>
                <span className="text-[#344054] tabular-nums">{VECTOR_STORE_INFO.top3Precision ? '92.4%' : '92.4%'}</span>
              </div>
              <div className="w-full bg-[#F2F4F7] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#3B5BFF] h-full rounded-full" style={{ width: '92.4%' }} />
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#667085] pt-0.5">
                <span>Top-3 precision</span>
                <span className="text-[#344054] tabular-nums">98.2%</span>
              </div>
              <div className="w-full bg-[#F2F4F7] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#12B76A] h-full rounded-full" style={{ width: '98.2%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-[10px] border border-[#E4E7EC] p-5 card-shadow">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
          <h2 className="text-sm font-semibold text-[#101828]">Documents</h2>

          <div className="relative w-full sm:w-60">
            <Search className="w-3.5 h-3.5 text-[#98A2B3] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search documents..."
              className="w-full pl-9 pr-3 py-1.5 bg-[#F9FAFB] border border-[#E4E7EC] rounded-[8px] text-xs text-[#101828] placeholder-[#98A2B3] focus:outline-none focus:border-[#3B5BFF]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#EAECF0] text-[#667085]">
                <th className="pb-2.5 font-medium">Name</th>
                <th className="pb-2.5 font-medium">Size</th>
                <th className="pb-2.5 font-medium">Pages</th>
                <th className="pb-2.5 font-medium">Chunks</th>
                <th className="pb-2.5 font-medium">Status</th>
                <th className="pb-2.5 font-medium">Updated</th>
                <th className="pb-2.5 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F2F4F7]">
              {filteredDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-[#F9FAFB] transition-colors">
                  <td className="py-2.5 font-medium text-[#101828]">
                    <div className="flex items-center gap-2.5">
                      {getFileTypeBadge(doc.type)}
                      <span className="truncate max-w-[200px] md:max-w-none">{doc.name}</span>
                    </div>
                  </td>
                  <td className="py-2.5 text-[#667085] tabular-nums">{doc.size}</td>
                  <td className="py-2.5 text-[#344054] tabular-nums">{doc.pages}</td>
                  <td className="py-2.5 text-[#344054] tabular-nums">{doc.chunks}</td>
                  <td className="py-2.5">
                    {doc.status === 'indexed' && (
                      <span className="inline-flex items-center gap-1.5 text-xs text-[#027A48]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#12B76A]" />
                        Indexed
                      </span>
                    )}
                    {doc.status === 'processing' && (
                      <div className="flex items-center gap-2">
                        {/* Circular Progress Ring */}
                        <svg className="w-4 h-4 transform -rotate-90">
                          <circle cx="8" cy="8" r="6" stroke="#F2F4F7" strokeWidth="2" fill="none" />
                          <circle
                            cx="8"
                            cy="8"
                            r="6"
                            stroke="#3B5BFF"
                            strokeWidth="2"
                            strokeDasharray="38"
                            strokeDashoffset={38 - (38 * (doc.progress || 72)) / 100}
                            fill="none"
                          />
                        </svg>
                        <span className="text-[11px] font-medium text-[#3B5BFF] tabular-nums">{doc.progress}%</span>
                      </div>
                    )}
                    {doc.status === 'failed' && (
                      <span className="inline-flex items-center gap-1.5 text-xs text-[#B42318]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F04438]" />
                        Failed
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 text-[#667085]">{doc.lastUpdated}</td>
                  <td className="py-2.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setSelectedDoc(doc)}
                        className="p-1 text-[#667085] hover:text-[#101828] rounded hover:bg-[#F2F4F7]"
                        title="View chunks"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => reindexDoc(doc.id, doc.name)}
                        className="p-1 text-[#667085] hover:text-[#3B5BFF] rounded hover:bg-[#F2F4F7]"
                        title="Re-index"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteDoc(doc.id, doc.name)}
                        className="p-1 text-[#667085] hover:text-[#F04438] rounded hover:bg-[#F2F4F7]"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Document Chunks Preview Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div 
            className="w-full max-w-xl bg-white border border-[#E4E7EC] rounded-[10px] shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#E4E7EC]">
              <div className="flex items-center gap-2">
                {getFileTypeBadge(selectedDoc.type)}
                <div>
                  <h3 className="text-sm font-semibold text-[#101828]">{selectedDoc.name}</h3>
                  <span className="text-xs text-[#667085]">
                    {selectedDoc.chunks} chunks · {selectedDoc.pages} pages
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedDoc(null)}
                className="text-[#667085] hover:text-[#101828] p-1 rounded-[6px]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-3 max-h-[70vh] overflow-y-auto text-xs">
              {selectedDoc.previewChunks && selectedDoc.previewChunks.length > 0 ? (
                selectedDoc.previewChunks.map((chunk) => (
                  <div key={chunk.id} className="p-3.5 bg-[#F9FAFB] rounded-[8px] border border-[#EAECF0] space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] text-[#667085] tabular-nums">
                      <span className="font-semibold text-[#3B5BFF]">Chunk #{chunk.chunkIndex}</span>
                      <span>Cosine match: {(chunk.similarityScore * 100).toFixed(1)}%</span>
                    </div>
                    <p className="text-xs text-[#344054] leading-relaxed bg-white p-2.5 rounded-[6px] border border-[#E4E7EC]">
                      "{chunk.text}"
                    </p>
                  </div>
                ))
              ) : (
                <div className="p-4 bg-[#F9FAFB] rounded-[8px] text-xs text-[#667085] text-center">
                  Preview chunks loading from Qdrant cluster...
                </div>
              )}
            </div>

            <div className="p-3.5 bg-[#F9FAFB] border-t border-[#E4E7EC] flex items-center justify-end">
              <button
                onClick={() => setSelectedDoc(null)}
                className="px-3.5 py-1.5 text-xs text-[#344054] hover:text-[#101828] bg-white border border-[#E4E7EC] rounded-[8px]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
