import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { EmployeeListPage } from './pages/EmployeeListPage';
import { EmployeeFormPage } from './pages/EmployeeFormPage';
import { SiteListPage } from './pages/SiteListPage';
import { SiteFormPage } from './pages/SiteFormPage';
import PayrollPage from './pages/PayrollPage';
import { InvoiceListPage } from './pages/InvoiceListPage';
import { InvoiceFormPage } from './pages/InvoiceFormPage';
import { SupplierListPage } from './pages/SupplierListPage';
import { SupplierFormPage } from './pages/SupplierFormPage';
import ReportsPage from './pages/ReportsPage';
import { Layout } from './components/layout/Layout';
import ProtectedRoute from './components/common/ProtectedRoute';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />

                <Route element={<ProtectedRoute />}>
                    <Route element={<Layout />}>
                        <Route path="/dashboard" element={<DashboardPage />} />
                        <Route path="/employees" element={<EmployeeListPage />} />
                        <Route path="/employees/new" element={<EmployeeFormPage />} />
                        <Route path="/employees/:id" element={<EmployeeFormPage />} />
                        <Route path="/sites" element={<SiteListPage />} />
                        <Route path="/sites/new" element={<SiteFormPage />} />
                        <Route path="/sites/:id" element={<SiteFormPage />} />
                        <Route path="/payroll" element={<PayrollPage />} />
                        <Route path="/invoices" element={<InvoiceListPage />} />
                        <Route path="/invoices/new" element={<InvoiceFormPage />} />
                        <Route path="/suppliers" element={<SupplierListPage />} />
                        <Route path="/suppliers/new" element={<SupplierFormPage />} />
                        <Route path="/reports" element={<ReportsPage />} />
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />
                        {/* Add other routes here */}
                    </Route>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
