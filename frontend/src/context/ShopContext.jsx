import { createContext, useContext, useEffect, useState } from 'react'
import { buildInitialCatalog, normalizeProduct } from '../data/productCatalog'
import { buildInitialCategories, slugify } from '../data/categoryStore'
import { popularSearches as defaultPopularSearches, CATEGORY_CONFIG as defaultCategoryConfig } from '../data/dummyData'
import { DEFAULT_FOOTER_SETTINGS, DEFAULT_FOOTER_SHOP_LINKS, DEFAULT_FOOTER_CATEGORY_LINKS, DEFAULT_PAGES, DEFAULT_FAQS, slugifyTitle } from '../data/footerStore'
import { adminOrders as seedOrders } from '../data/adminData'
import { buildStatusHistory } from '../data/orderStore'
import {
  buildInitialBanners, buildInitialCollections, buildInitialCategoryCards,
  normalizeBanner, normalizeCollection, normalizeCategoryCard, DEFAULT_TRUST_BADGES,
  buildInitialFeatureBanners, normalizeFeatureBanner,
} from '../data/homepageStore'

const ShopContext = createContext(null)

const CART_KEY = 'hashtelicom_cart'
const WISHLIST_KEY = 'hashtelicom_wishlist'
const SITE_ASSETS_KEY = 'hashtelicom_site_assets'
const PRODUCTS_KEY = 'hashtelicom_products'
const CATEGORIES_KEY = 'hashtelicom_categories'
const TOPBAR_KEY = 'hashtelicom_topbar'
const FOOTER_SETTINGS_KEY = 'hashtelicom_footer_settings'
const FOOTER_SHOP_LINKS_KEY = 'hashtelicom_footer_shop_links'
const FOOTER_CATEGORY_LINKS_KEY = 'hashtelicom_footer_category_links'
const PAGES_KEY = 'hashtelicom_pages'
const FAQS_KEY = 'hashtelicom_faqs'
const BANNERS_KEY = 'hashtelicom_banners'
const COLLECTIONS_KEY = 'hashtelicom_collections'
const CATEGORY_CARDS_KEY = 'hashtelicom_category_cards'
const FEATURE_BANNERS_KEY = 'hashtelicom_feature_banners'
const TRUST_BADGES_KEY = 'hashtelicom_trust_badges'
const ORDERS_KEY = 'hashtelicom_orders'
const CATEGORY_CONFIGS_KEY = 'hashtelicom_category_configs'

export const DEFAULT_TOPBAR_SETTINGS = {
  announcementEnabled: false,
  announcementText: 'Free shipping on orders above ₹999',
  announcementBgType: 'gradient',
  announcementBgColor1: '#a855f7',
  announcementBgColor2: '#ec4899',
  announcementBgColor3: '#fca5a5',
}

// Default (fallback) image paths — these are the original files bundled in /public.
// Admin-uploaded images (base64 data URLs) override these once set.
export const DEFAULT_SITE_ASSETS = {
  logoUrl: '/logo.png',
  loginImageUrl: '/login.png',
  signupImageUrl: '/signin.png',
}

function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

// Build a stable line-item id for a product + chosen variant so the same
// product in a different color/size is tracked as its own cart line.
function buildCartId(productId, color, size) {
  return [productId, color || 'default', size || 'default'].join('__')
}

export function ShopProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => loadFromStorage(CART_KEY, []))
  const [wishlistItems, setWishlistItems] = useState(() => loadFromStorage(WISHLIST_KEY, []))
  const [toast, setToast] = useState('')
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [siteAssets, setSiteAssets] = useState(() =>
    loadFromStorage(SITE_ASSETS_KEY, DEFAULT_SITE_ASSETS)
  )
  const [products, setProducts] = useState(() => {
    const stored = loadFromStorage(PRODUCTS_KEY, null)
    return stored && stored.length ? stored : buildInitialCatalog()
  })
  const [categories, setCategories] = useState(() => {
    const stored = loadFromStorage(CATEGORIES_KEY, null)
    return stored && stored.length ? stored : buildInitialCategories()
  })
  const [topbarSettings, setTopbarSettings] = useState(() =>
    loadFromStorage(TOPBAR_KEY, DEFAULT_TOPBAR_SETTINGS)
  )
  const [popularSearches, setPopularSearches] = useState(() => {
    const stored = loadFromStorage('hashtelicom_popular_searches', null)
    return stored && stored.length ? stored : defaultPopularSearches
  })
  const [categoryConfigs, setCategoryConfigs] = useState(() => {
    const stored = loadFromStorage(CATEGORY_CONFIGS_KEY, null)
    return stored && Object.keys(stored).length ? stored : defaultCategoryConfig
  })
  const [footerSettings, setFooterSettings] = useState(() =>
    loadFromStorage(FOOTER_SETTINGS_KEY, DEFAULT_FOOTER_SETTINGS)
  )
  const [footerShopLinks, setFooterShopLinks] = useState(() => {
    const stored = loadFromStorage(FOOTER_SHOP_LINKS_KEY, null)
    return stored && stored.length ? stored : DEFAULT_FOOTER_SHOP_LINKS
  })
  const [footerCategoryLinks, setFooterCategoryLinks] = useState(() => {
    const stored = loadFromStorage(FOOTER_CATEGORY_LINKS_KEY, null)
    return stored && stored.length ? stored : DEFAULT_FOOTER_CATEGORY_LINKS
  })
  const [pages, setPages] = useState(() => {
    const stored = loadFromStorage(PAGES_KEY, null)
    return stored && stored.length ? stored : DEFAULT_PAGES
  })
  const [faqs, setFaqs] = useState(() => {
    const stored = loadFromStorage(FAQS_KEY, null)
    return stored && stored.length ? stored : DEFAULT_FAQS
  })
  const [banners, setBanners] = useState(() => {
    const stored = loadFromStorage(BANNERS_KEY, null)
    return stored && stored.length ? stored : buildInitialBanners()
  })
  const [collections, setCollections] = useState(() => {
    const stored = loadFromStorage(COLLECTIONS_KEY, null)
    return stored && stored.length ? stored : buildInitialCollections()
  })
  const [categoryCards, setCategoryCards] = useState(() => {
    const stored = loadFromStorage(CATEGORY_CARDS_KEY, null)
    return stored && stored.length ? stored : buildInitialCategoryCards()
  })
  const [trustBadges, setTrustBadges] = useState(() => {
    const stored = loadFromStorage(TRUST_BADGES_KEY, null)
    return stored && stored.length ? stored : DEFAULT_TRUST_BADGES
  })
  const [featureBanners, setFeatureBanners] = useState(() => {
    const stored = loadFromStorage(FEATURE_BANNERS_KEY, null)
    return stored && stored.length ? stored : buildInitialFeatureBanners()
  })

  useEffect(() => {
    localStorage.setItem(FEATURE_BANNERS_KEY, JSON.stringify(featureBanners))
  }, [featureBanners])

  useEffect(() => {
    localStorage.setItem(BANNERS_KEY, JSON.stringify(banners))
  }, [banners])

  useEffect(() => {
    localStorage.setItem(COLLECTIONS_KEY, JSON.stringify(collections))
  }, [collections])

  useEffect(() => {
    localStorage.setItem(CATEGORY_CARDS_KEY, JSON.stringify(categoryCards))
  }, [categoryCards])

  useEffect(() => {
    localStorage.setItem(TRUST_BADGES_KEY, JSON.stringify(trustBadges))
  }, [trustBadges])

  function reorderList(setter, id, direction) {
    setter((prev) => {
      const idx = prev.findIndex((x) => x.id === id)
      const swapWith = direction === 'up' ? idx - 1 : idx + 1
      if (idx < 0 || swapWith < 0 || swapWith >= prev.length) return prev
      const next = [...prev]
      ;[next[idx], next[swapWith]] = [next[swapWith], next[idx]]
      return next
    })
  }

  // ---------------- Homepage: Hero Banners ----------------
  const addBanner = (data) => setBanners((prev) => [...prev, normalizeBanner({ ...data, id: `banner-${Date.now()}` })])
  const updateBanner = (id, updates) => setBanners((prev) => prev.map((b) => (b.id === id ? normalizeBanner({ ...b, ...updates, id }) : b)))
  const deleteBanner = (id) => setBanners((prev) => prev.filter((b) => b.id !== id))
  const reorderBanner = (id, direction) => reorderList(setBanners, id, direction)

  // ---------------- Homepage: Collections grid ----------------
  const addCollection = (data) => setCollections((prev) => [...prev, normalizeCollection({ ...data, id: `col-${Date.now()}` })])
  const updateCollection = (id, updates) => setCollections((prev) => prev.map((c) => (c.id === id ? normalizeCollection({ ...c, ...updates, id }) : c)))
  const deleteCollection = (id) => setCollections((prev) => prev.filter((c) => c.id !== id))
  const reorderCollection = (id, direction) => reorderList(setCollections, id, direction)

  // ---------------- Homepage: Category cards ----------------
  const addCategoryCard = (data) => setCategoryCards((prev) => [...prev, normalizeCategoryCard({ ...data, id: `card-${Date.now()}` })])
  const updateCategoryCard = (id, updates) => setCategoryCards((prev) => prev.map((c) => (c.id === id ? normalizeCategoryCard({ ...c, ...updates, id }) : c)))
  const deleteCategoryCard = (id) => setCategoryCards((prev) => prev.filter((c) => c.id !== id))
  const reorderCategoryCard = (id, direction) => reorderList(setCategoryCards, id, direction)

  // ---------------- Homepage: Feature banner (full-width promo strip) ----------------
  const addFeatureBanner = (data) => setFeatureBanners((prev) => [...prev, normalizeFeatureBanner({ ...data, id: `fb-${Date.now()}` })])
  const updateFeatureBanner = (id, updates) => setFeatureBanners((prev) => prev.map((b) => (b.id === id ? normalizeFeatureBanner({ ...b, ...updates, id }) : b)))
  const deleteFeatureBanner = (id) => setFeatureBanners((prev) => prev.filter((b) => b.id !== id))
  const reorderFeatureBanner = (id, direction) => reorderList(setFeatureBanners, id, direction)

  // ---------------- Footer trust badges ----------------
  const addTrustBadge = (data) => setTrustBadges((prev) => [...prev, { id: `tb-${Date.now()}`, icon: data.icon || 'ShieldCheck', title: data.title.trim(), desc: data.desc.trim() }])
  const updateTrustBadge = (id, updates) => setTrustBadges((prev) => prev.map((b) => (b.id === id ? { ...b, ...updates } : b)))
  const deleteTrustBadge = (id) => setTrustBadges((prev) => prev.filter((b) => b.id !== id))
  const reorderTrustBadge = (id, direction) => reorderList(setTrustBadges, id, direction)

  // ---------------- Orders ----------------
  const [orders, setOrders] = useState(() => {
    const stored = loadFromStorage(ORDERS_KEY, null)
    if (stored && stored.length) return stored
    return seedOrders.map((o) => ({ ...o, statusHistory: buildStatusHistory(o.status, o.date) }))
  })

  useEffect(() => {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders))
  }, [orders])

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o
        if (o.status === newStatus) return o
        return {
          ...o,
          status: newStatus,
          statusHistory: [...(o.statusHistory || []), { status: newStatus, timestamp: new Date().toISOString() }],
        }
      })
    )
  }

  const getOrderById = (orderId) => orders.find((o) => o.id === orderId)

  useEffect(() => {
    localStorage.setItem(FOOTER_SETTINGS_KEY, JSON.stringify(footerSettings))
  }, [footerSettings])

  useEffect(() => {
    localStorage.setItem(FOOTER_SHOP_LINKS_KEY, JSON.stringify(footerShopLinks))
  }, [footerShopLinks])

  useEffect(() => {
    localStorage.setItem(FOOTER_CATEGORY_LINKS_KEY, JSON.stringify(footerCategoryLinks))
  }, [footerCategoryLinks])

  useEffect(() => {
    localStorage.setItem(PAGES_KEY, JSON.stringify(pages))
  }, [pages])

  useEffect(() => {
    localStorage.setItem(FAQS_KEY, JSON.stringify(faqs))
  }, [faqs])

  // ---------------- Footer settings (brand text, social links, copyright) ----------------
  const updateFooterSettings = (updates) => {
    setFooterSettings((prev) => ({
      ...prev,
      ...updates,
      social: updates.social ? { ...prev.social, ...updates.social } : prev.social,
    }))
  }

  // ---------------- Footer "Shop" links ----------------
  const addFooterShopLink = (data) => {
    const newLink = { id: `fs-${Date.now()}`, label: data.label.trim(), slug: data.slug }
    setFooterShopLinks((prev) => [...prev, newLink])
  }

  const updateFooterShopLink = (id, updates) => {
    setFooterShopLinks((prev) => prev.map((l) => (l.id === id ? { ...l, ...updates } : l)))
  }

  const deleteFooterShopLink = (id) => {
    setFooterShopLinks((prev) => prev.filter((l) => l.id !== id))
  }

  const reorderFooterShopLink = (id, direction) => {
    setFooterShopLinks((prev) => {
      const idx = prev.findIndex((l) => l.id === id)
      const swapWith = direction === 'up' ? idx - 1 : idx + 1
      if (idx < 0 || swapWith < 0 || swapWith >= prev.length) return prev
      const next = [...prev]
      ;[next[idx], next[swapWith]] = [next[swapWith], next[idx]]
      return next
    })
  }

  // ---------------- Footer "Categories" links ----------------
  const addFooterCategoryLink = (data) => {
    const newLink = { id: `fc-${Date.now()}`, label: data.label.trim(), slug: data.slug }
    setFooterCategoryLinks((prev) => [...prev, newLink])
  }

  const updateFooterCategoryLink = (id, updates) => {
    setFooterCategoryLinks((prev) => prev.map((l) => (l.id === id ? { ...l, ...updates } : l)))
  }

  const deleteFooterCategoryLink = (id) => {
    setFooterCategoryLinks((prev) => prev.filter((l) => l.id !== id))
  }

  const reorderFooterCategoryLink = (id, direction) => {
    setFooterCategoryLinks((prev) => {
      const idx = prev.findIndex((l) => l.id === id)
      const swapWith = direction === 'up' ? idx - 1 : idx + 1
      if (idx < 0 || swapWith < 0 || swapWith >= prev.length) return prev
      const next = [...prev]
      ;[next[idx], next[swapWith]] = [next[swapWith], next[idx]]
      return next
    })
  }

  // ---------------- Info pages (Terms, Privacy, Shipping, Returns, Contact, etc.) ----------------
  const addPage = (data) => {
    const newPage = { id: `page-${Date.now()}`, title: data.title.trim(), slug: slugifyTitle(data.title), content: data.content || '' }
    setPages((prev) => [...prev, newPage])
    return newPage
  }

  const updatePage = (id, updates) => {
    setPages((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates, slug: updates.title ? slugifyTitle(updates.title) : p.slug } : p))
    )
  }

  const deletePage = (id) => {
    setPages((prev) => prev.filter((p) => p.id !== id))
  }

  const getPageBySlug = (slug) => pages.find((p) => p.slug === slug)

  // ---------------- FAQs ----------------
  const addFaq = (data) => {
    const newFaq = { id: `faq-${Date.now()}`, question: data.question.trim(), answer: data.answer.trim() }
    setFaqs((prev) => [...prev, newFaq])
  }

  const updateFaq = (id, updates) => {
    setFaqs((prev) => prev.map((f) => (f.id === id ? { ...f, ...updates } : f)))
  }

  const deleteFaq = (id) => {
    setFaqs((prev) => prev.filter((f) => f.id !== id))
  }

  const reorderFaq = (id, direction) => {
    setFaqs((prev) => {
      const idx = prev.findIndex((f) => f.id === id)
      const swapWith = direction === 'up' ? idx - 1 : idx + 1
      if (idx < 0 || swapWith < 0 || swapWith >= prev.length) return prev
      const next = [...prev]
      ;[next[idx], next[swapWith]] = [next[swapWith], next[idx]]
      return next
    })
  }

  useEffect(() => {
    localStorage.setItem(TOPBAR_KEY, JSON.stringify(topbarSettings))
  }, [topbarSettings])

  useEffect(() => {
    localStorage.setItem('hashtelicom_popular_searches', JSON.stringify(popularSearches))
  }, [popularSearches])

  // ---------------- Top Bar (announcement strip + search suggestions) ----------------
  const updateTopbarSettings = (updates) => {
    setTopbarSettings((prev) => ({ ...prev, ...updates }))
  }

  const addPopularSearch = (term) => {
    const t = term.trim()
    if (!t) return
    setPopularSearches((prev) => (prev.includes(t) ? prev : [...prev, t]))
  }

  const removePopularSearch = (term) => {
    setPopularSearches((prev) => prev.filter((t) => t !== term))
  }

  useEffect(() => {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories))
  }, [categories])

  // ---------------- Categories (admin-managed) ----------------
  const addCategory = (data) => {
    const slug = slugify(data.name)
    const newCategory = { id: `cat-${Date.now()}`, name: data.name.trim(), slug, icon: data.icon || 'Package', image: data.image || '' }
    setCategories((prev) => [...prev, newCategory])
    return newCategory
  }

  const updateCategory = (id, updates) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, ...updates, slug: updates.name ? slugify(updates.name) : c.slug }
          : c
      )
    )
  }

  const deleteCategory = (id) => {
    setCategories((prev) => prev.filter((c) => c.id !== id))
  }

  const reorderCategory = (id, direction) => {
    setCategories((prev) => {
      const idx = prev.findIndex((c) => c.id === id)
      const swapWith = direction === 'up' ? idx - 1 : idx + 1
      if (idx < 0 || swapWith < 0 || swapWith >= prev.length) return prev
      const next = [...prev]
      ;[next[idx], next[swapWith]] = [next[swapWith], next[idx]]
      return next
    })
  }

  useEffect(() => {
    localStorage.setItem(CATEGORY_CONFIGS_KEY, JSON.stringify(categoryConfigs))
  }, [categoryConfigs])

  const updateCategoryConfig = (slug, updates) => {
    setCategoryConfigs((prev) => ({
      ...prev,
      [slug]: {
        ...prev[slug],
        ...updates
      }
    }))
  }

  useEffect(() => {
    try {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products))
    } catch (e) {
      if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
        showToast('Storage limit reached! Please delete some products or clear site data.')
        console.error('Local storage full!')
      }
    }
  }, [products])

  // ---------------- Products (admin-managed catalog) ----------------
  const addProduct = (data) => {
    const id = data.id || `custom-${Date.now()}`
    const newProduct = normalizeProduct({ ...data, id })
    setProducts((prev) => [newProduct, ...prev])
    return newProduct
  }

  const updateProduct = (id, updates) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === String(id) ? normalizeProduct({ ...p, ...updates, id: p.id }) : p))
    )
  }

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== String(id)))
  }

  const getProductById = (id) => products.find((p) => p.id === String(id))

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems))
  }, [cartItems])

  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlistItems))
  }, [wishlistItems])

  useEffect(() => {
    localStorage.setItem(SITE_ASSETS_KEY, JSON.stringify(siteAssets))
  }, [siteAssets])

  // ---------------- Site Assets (admin-uploaded branding images) ----------------
  // dataUrl: base64 image string from FileReader, or null to reset to default.
  const setSiteAsset = (key, dataUrl) => {
    setSiteAssets((prev) => ({ ...prev, [key]: dataUrl || DEFAULT_SITE_ASSETS[key] }))
  }

  const resetSiteAsset = (key) => {
    setSiteAssets((prev) => ({ ...prev, [key]: DEFAULT_SITE_ASSETS[key] }))
  }

  const showToast = (message) => {
    setToast(message)
    window.clearTimeout(showToast._t)
    showToast._t = window.setTimeout(() => setToast(''), 2000)
  }

  // ---------------- Cart ----------------
  const addToCart = (product, options = {}) => {
    const { quantity = 1, color, size } = options
    const cartId = buildCartId(product.id, color, size)

    setCartItems((prev) => {
      const existing = prev.find((item) => item.cartId === cartId)
      if (existing) {
        return prev.map((item) =>
          item.cartId === cartId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [
        ...prev,
        {
          cartId,
          id: product.id,
          name: product.name,
          image: product.image,
          price: product.price,
          originalPrice: product.originalPrice ?? product.price,
          discount: product.discount,
          color: color || null,
          size: size || null,
          category: product.category,
          quantity,
        },
      ]
    })
    showToast(`${product.name} added to cart`)
  }

  const removeFromCart = (cartId) => {
    setCartItems((prev) => prev.filter((item) => item.cartId !== cartId))
  }

  const updateQuantity = (cartId, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.cartId === cartId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    )
  }

  const setQuantity = (cartId, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.cartId === cartId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    )
  }

  const clearCart = () => setCartItems([])

  const isInCart = (productId) => cartItems.some((item) => item.id === productId)

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)
  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const cartOriginalTotal = cartItems.reduce(
    (acc, item) => acc + (item.originalPrice ?? item.price) * item.quantity,
    0
  )
  const cartDiscount = Math.max(0, cartOriginalTotal - cartSubtotal)

  // ---------------- Wishlist ----------------
  const isWishlisted = (productId) => wishlistItems.some((item) => item.id === productId)

  const addToWishlist = (product) => {
    setWishlistItems((prev) => {
      if (prev.some((item) => item.id === product.id)) return prev
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          image: product.image,
          price: product.price,
          originalPrice: product.originalPrice ?? product.price,
          discount: product.discount,
          category: product.category,
          brand: product.brand || product.category || '',
          size: product.size || (product.sizes ? product.sizes[0] : 'One Size'),
          color: product.color || (product.colors ? product.colors[0] : ''),
        },
      ]
    })
    showToast(`${product.name} added to wishlist`)
  }

  const removeFromWishlist = (productId) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== productId))
  }

  const toggleWishlist = (product) => {
    if (isWishlisted(product.id)) {
      removeFromWishlist(product.id)
      showToast(`${product.name} removed from wishlist`)
    } else {
      addToWishlist(product)
    }
  }

  const moveWishlistItemToCart = (item) => {
    addToCart(item, { quantity: 1, color: item.color, size: item.size })
    removeFromWishlist(item.id)
  }

  const moveAllWishlistToCart = () => {
    wishlistItems.forEach((item) => addToCart(item, { quantity: 1, color: item.color, size: item.size }))
    setWishlistItems([])
    showToast('All items moved to cart!')
  }

  const wishlistCount = wishlistItems.length

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    setQuantity,
    clearCart,
    isInCart,
    cartCount,
    cartSubtotal,
    cartOriginalTotal,
    cartDiscount,

    wishlistItems,
    isWishlisted,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    moveWishlistItemToCart,
    moveAllWishlistToCart,
    wishlistCount,

    toast,
    showToast,
    isChatOpen,
    setIsChatOpen,

    siteAssets,
    setSiteAsset,
    resetSiteAsset,

    products,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,

    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    reorderCategory,

    categoryConfigs,
    updateCategoryConfig,

    topbarSettings,
    updateTopbarSettings,
    popularSearches,
    addPopularSearch,
    removePopularSearch,

    footerSettings,
    updateFooterSettings,
    footerShopLinks,
    addFooterShopLink,
    updateFooterShopLink,
    deleteFooterShopLink,
    reorderFooterShopLink,

    footerCategoryLinks,
    addFooterCategoryLink,
    updateFooterCategoryLink,
    deleteFooterCategoryLink,
    reorderFooterCategoryLink,

    pages,
    addPage,
    updatePage,
    deletePage,
    getPageBySlug,

    faqs,
    addFaq,
    updateFaq,
    deleteFaq,
    reorderFaq,

    banners,
    addBanner,
    updateBanner,
    deleteBanner,
    reorderBanner,

    collections,
    addCollection,
    updateCollection,
    deleteCollection,
    reorderCollection,

    categoryCards,
    addCategoryCard,
    updateCategoryCard,
    deleteCategoryCard,
    reorderCategoryCard,

    featureBanners,
    addFeatureBanner,
    updateFeatureBanner,
    deleteFeatureBanner,
    reorderFeatureBanner,

    trustBadges,
    addTrustBadge,
    updateTrustBadge,
    deleteTrustBadge,
    reorderTrustBadge,

    orders,
    updateOrderStatus,
    getOrderById,
  }

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}

export function useShop() {
  const ctx = useContext(ShopContext)
  if (!ctx) throw new Error('useShop must be used within a ShopProvider')
  return ctx
}
