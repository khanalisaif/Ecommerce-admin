import { categories as navCategories, CATEGORY_PRODUCTS } from './dummyData'

// Curated set of icons an admin can pick from when creating/editing a category.
// Keys must match component names importable from 'lucide-react'.
export const CATEGORY_ICON_OPTIONS = [
  'Home', 'User', 'PersonStanding', 'Heart', 'List', 'Flower2', 'Droplet',
  'Camera', 'Music', 'Gift', 'Sparkles', 'Flame', 'Laptop', 'Tablet',
  'Smartphone', 'Headphones', 'Package', 'ShoppingBag', 'Watch', 'Shirt',
]

export function slugify(name) {
  return name.trim().replace(/\s+/g, '-')
}

// Builds the initial category list by merging the nav-strip categories
// (which already carry a curated icon) with any product-type category slugs
// (Laptop, Phone, etc.) that aren't already represented, so every category
// products can belong to shows up as a manageable entry.
export function buildInitialCategories() {
  const list = []
  const seenSlugs = new Set()

  navCategories.forEach((c) => {
    const slug = slugify(c.name)
    if (seenSlugs.has(slug)) return
    seenSlugs.add(slug)
    list.push({ id: c.id, name: c.name, slug, icon: c.icon || 'Package', image: '' })
  })

  Object.keys(CATEGORY_PRODUCTS).forEach((slug) => {
    if (seenSlugs.has(slug)) return
    seenSlugs.add(slug)
    list.push({ id: `cat-${slug}`, name: slug, slug, icon: 'Package', image: '' })
  })

  return list
}
