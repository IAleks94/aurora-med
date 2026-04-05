import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import {
  About,
  Contacts,
  FAQ,
  Home,
  OrderForm,
  Suppliers,
} from '@/pages'

function LangUnknownPathRedirect() {
  const { lang } = useParams()
  return <Navigate to={`/${lang}`} replace />
}

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
        <Route path="*" element={<LangUnknownPathRedirect />} />
      </Route>
      <Route path="*" element={<Navigate to="/ru" replace />} />
    </Routes>
  )
}
