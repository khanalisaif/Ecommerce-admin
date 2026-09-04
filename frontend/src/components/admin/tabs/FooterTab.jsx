import { useState } from 'react'
import { LayoutTemplate, Share2, Plus, Trash2, ChevronUp, ChevronDown, Pencil, ShieldCheck, Truck, Headphones, Lock, RotateCcw, Box, Gift, Sparkles } from 'lucide-react'
import { useShop } from '../../../context/ShopContext'
import TrustBadgeFormModal from '../TrustBadgeFormModal'

const trustIconComponents = { ShieldCheck, Truck, Headphones, Lock, RotateCcw, Box, Gift, Sparkles }

export default function FooterTab() {
  const {
    footerSettings, updateFooterSettings,
    footerShopLinks, addFooterShopLink, deleteFooterShopLink, reorderFooterShopLink,
    footerCategoryLinks, addFooterCategoryLink, deleteFooterCategoryLink, reorderFooterCategoryLink,
    trustBadges, addTrustBadge, updateTrustBadge, deleteTrustBadge, reorderTrustBadge,
    categories, showToast,
  } = useShop()

  const [newLinkLabel, setNewLinkLabel] = useState('')
  const [newLinkSlug, setNewLinkSlug] = useState(categories[0]?.slug || '')
  const [newCatLabel, setNewCatLabel] = useState('')
  const [newCatSlug, setNewCatSlug] = useState(categories[0]?.slug || '')
  const [badgeModalOpen, setBadgeModalOpen] = useState(false)
  const [editingBadge, setEditingBadge] = useState(null)

  const handleAddLink = (e) => {
    e.preventDefault()
    if (!newLinkLabel.trim() || !newLinkSlug) return
    addFooterShopLink({ label: newLinkLabel, slug: newLinkSlug })
    setNewLinkLabel('')
    showToast('Footer link added')
  }

  const handleAddCatLink = (e) => {
    e.preventDefault()
    if (!newCatLabel.trim() || !newCatSlug) return
    addFooterCategoryLink({ label: newCatLabel, slug: newCatSlug })
    setNewCatLabel('')
    showToast('Category link added')
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start w-full">
      {/* Brand text */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)' }}>
            <LayoutTemplate size={18} className="text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Footer Brand Text</h3>
            <p className="text-gray-500 text-sm">Shown next to your logo in the footer</p>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-gray-800 font-semibold text-sm mb-1.5">Tagline</label>
            <input
              value={footerSettings.tagline}
              onChange={(e) => updateFooterSettings({ tagline: e.target.value })}
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-purple-500"
            />
          </div>
          <div>
            <label className="block text-gray-800 font-semibold text-sm mb-1.5">Description</label>
            <textarea
              value={footerSettings.description}
              onChange={(e) => updateFooterSettings({ description: e.target.value })}
              rows={2}
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-purple-500 resize-none"
            />
          </div>
          <div>
            <label className="block text-gray-800 font-semibold text-sm mb-1.5">Copyright Text</label>
            <input
              value={footerSettings.copyrightText}
              onChange={(e) => updateFooterSettings({ copyrightText: e.target.value })}
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>
      </div>

      {/* Social links */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)' }}>
            <Share2 size={18} className="text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Social Media Links</h3>
            <p className="text-gray-500 text-sm">Leave blank to hide an icon from the footer</p>
          </div>
        </div>

        <div className="space-y-3">
          {['instagram', 'facebook', 'twitter', 'linkedin'].map((key) => (
            <div key={key}>
              <label className="block text-gray-800 font-semibold text-sm mb-1.5 capitalize">{key}</label>
              <input
                value={footerSettings.social?.[key] || ''}
                onChange={(e) => updateFooterSettings({ social: { [key]: e.target.value } })}
                placeholder={`https://${key}.com/yourpage`}
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-purple-500"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Shop links */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-900 mb-1">Footer "Shop" Links</h3>
        <p className="text-gray-500 text-sm mb-4">Quick links shown in the Shop column of the footer</p>

        <form onSubmit={handleAddLink} className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            value={newLinkLabel}
            onChange={(e) => setNewLinkLabel(e.target.value)}
            placeholder="Link label, e.g. Trending"
            className="flex-1 px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-purple-500"
          />
          <select
            value={newLinkSlug}
            onChange={(e) => setNewLinkSlug(e.target.value)}
            className="px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-purple-500 bg-white"
          >
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>{c.name}</option>
            ))}
          </select>
          <button
            type="submit"
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold text-white whitespace-nowrap transition-all hover:shadow-lg"
            style={{ background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)' }}
          >
            <Plus size={16} /> Add
          </button>
        </form>

        <div className="space-y-2">
          {footerShopLinks.map((link, idx) => (
            <div key={link.id} className="flex items-center gap-3 bg-gray-50 rounded-lg px-3 py-2">
              <div className="flex flex-col">
                <button disabled={idx === 0} onClick={() => reorderFooterShopLink(link.id, 'up')} className="text-gray-300 hover:text-purple-600 disabled:opacity-30">
                  <ChevronUp size={13} />
                </button>
                <button disabled={idx === footerShopLinks.length - 1} onClick={() => reorderFooterShopLink(link.id, 'down')} className="text-gray-300 hover:text-purple-600 disabled:opacity-30">
                  <ChevronDown size={13} />
                </button>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{link.label}</p>
                <p className="text-gray-400 text-[11px] font-mono">/category/{link.slug}</p>
              </div>
              <button onClick={() => deleteFooterShopLink(link.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
          {!footerShopLinks.length && <p className="text-gray-400 text-sm">No links added yet</p>}
        </div>
      </div>
      {/* Category links */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-900 mb-1">Footer "Categories" Links</h3>
        <p className="text-gray-500 text-sm mb-4">Quick links shown in the Categories column of the footer</p>

        <form onSubmit={handleAddCatLink} className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            value={newCatLabel}
            onChange={(e) => setNewCatLabel(e.target.value)}
            placeholder="Link label, e.g. Electronics"
            className="flex-1 px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-purple-500"
          />
          <select
            value={newCatSlug}
            onChange={(e) => setNewCatSlug(e.target.value)}
            className="px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-purple-500 bg-white"
          >
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>{c.name}</option>
            ))}
          </select>
          <button
            type="submit"
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold text-white whitespace-nowrap transition-all hover:shadow-lg"
            style={{ background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)' }}
          >
            <Plus size={16} /> Add
          </button>
        </form>

        <div className="space-y-2">
          {footerCategoryLinks.map((link, idx) => (
            <div key={link.id} className="flex items-center gap-3 bg-gray-50 rounded-lg px-3 py-2">
              <div className="flex flex-col">
                <button disabled={idx === 0} onClick={() => reorderFooterCategoryLink(link.id, 'up')} className="text-gray-300 hover:text-purple-600 disabled:opacity-30">
                  <ChevronUp size={13} />
                </button>
                <button disabled={idx === footerCategoryLinks.length - 1} onClick={() => reorderFooterCategoryLink(link.id, 'down')} className="text-gray-300 hover:text-purple-600 disabled:opacity-30">
                  <ChevronDown size={13} />
                </button>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{link.label}</p>
                <p className="text-gray-400 text-[11px] font-mono">/category/{link.slug}</p>
              </div>
              <button onClick={() => deleteFooterCategoryLink(link.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
          {!footerCategoryLinks.length && <p className="text-gray-400 text-sm">No links added yet</p>}
        </div>
      </div>

      {/* Trust badges */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)' }}>
              <ShieldCheck size={18} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Trust Badges</h3>
              <p className="text-gray-500 text-sm">The features strip shown above the footer</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {trustBadges.map((badge, idx) => {
            const Icon = trustIconComponents[badge.icon] || ShieldCheck
            return (
              <div key={badge.id} className="flex items-center gap-3 bg-gray-50 rounded-lg px-3 py-2">
                <div className="flex flex-col">
                  <button disabled={idx === 0} onClick={() => reorderTrustBadge(badge.id, 'up')} className="text-gray-300 hover:text-purple-600 disabled:opacity-30"><ChevronUp size={13} /></button>
                  <button disabled={idx === trustBadges.length - 1} onClick={() => reorderTrustBadge(badge.id, 'down')} className="text-gray-300 hover:text-purple-600 disabled:opacity-30"><ChevronDown size={13} /></button>
                </div>
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0 border border-gray-100">
                  <Icon size={15} className="text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{badge.title}</p>
                  <p className="text-gray-400 text-[11px] truncate">{badge.desc}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => { setEditingBadge(badge); setBadgeModalOpen(true) }} className="p-1.5 rounded-lg text-gray-400 hover:text-purple-600 hover:bg-purple-50"><Pencil size={14} /></button>
                </div>
              </div>
            )
          })}
          {!trustBadges.length && <p className="text-gray-400 text-sm">No trust badges added yet</p>}
        </div>
      </div>

      {badgeModalOpen && (
        <TrustBadgeFormModal
          badge={editingBadge}
          onClose={() => { setBadgeModalOpen(false); setEditingBadge(null) }}
          onSave={(data) => {
            editingBadge ? updateTrustBadge(editingBadge.id, data) : addTrustBadge(data)
            showToast(editingBadge ? 'Trust badge updated' : 'Trust badge added')
            setBadgeModalOpen(false); setEditingBadge(null)
          }}
        />
      )}
    </div>
  )
}
