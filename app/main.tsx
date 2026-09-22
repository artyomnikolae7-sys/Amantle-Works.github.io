/// <reference types="vite/client" />

import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './globals.css'
import App from './app.tsx'
import { ErrorBoundary } from './components/ui/ErrorBoundary.tsx'
import { Version2Site } from './features/v2/Version2Site.tsx'
import { Version3Site } from './features/v3/Version3Site.tsx'
import { Version4Site } from './features/v4/Version4Site.tsx'
import { PlatformLayout } from './platform/PlatformLayout.tsx'
import { DashboardPage } from './platform/DashboardPage.tsx'
import { DocumentsPage } from './platform/DocumentsPage.tsx'
import { SpecificationsPage } from './platform/SpecificationsPage.tsx'
import { ProjectsPage } from './platform/ProjectsPage.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <HashRouter>
        <Routes>
          {/* Version 1 Route */}
          <Route path="/" element={<App />} />
          
          {/* Version 2 Route */}
          <Route path="/v2" element={<Version2Site onSwitchToV1={() => window.location.hash = '#/'} />} />
          
          {/* Version 3 Route */}
          <Route path="/v3" element={<Version3Site onSwitchToV1={() => window.location.hash = '#/'} onSwitchToV2={() => window.location.hash = '#/v2'} />} />

          {/* Version 4 Route */}
          <Route path="/v4" element={
            <Version4Site 
              onSwitchToV1={() => window.location.hash = '#/'} 
              onSwitchToV2={() => window.location.hash = '#/v2'} 
              onSwitchToV3={() => window.location.hash = '#/v3'} 
            />
          } />

          {/* Platform Routes */}
          <Route path="/platform" element={<PlatformLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="documents" element={<DocumentsPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="specifications" element={<SpecificationsPage />} />
            <Route path="materials" element={<div className="p-4">Материалы (В разработке)</div>} />
            <Route path="checks" element={<div className="p-4">Проверки (В разработке)</div>} />
            <Route path="wiki" element={<div className="p-4">База знаний (В разработке)</div>} />
          </Route>
        </Routes>
      </HashRouter>
    </ErrorBoundary>
  </React.StrictMode>,
)
