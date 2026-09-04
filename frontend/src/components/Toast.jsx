import { useShop } from '../context/ShopContext'

export default function Toast() {
  const { toast } = useShop()
  if (!toast) return null
  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] bg-gray-900 text-white px-5 py-3 rounded-lg font-bold shadow-lg text-sm animate-fade-in">
      ✓ {toast}
    </div>
  )
}
