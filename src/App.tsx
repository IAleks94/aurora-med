import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import {
  About,
  Contacts,
  FAQ,
  Home,
  NotFound,
  OrderForm,
  Suppliers,
} from '@/pages'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/ru" replace />} />
      <Route path="/:lang" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="order" element={<OrderForm />} />
        <Route path="suppliers" element={<Suppliers />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="*" element={<Navigate to="/ru" replace />} />
    </Routes>
  )
}
