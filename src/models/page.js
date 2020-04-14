import _ from 'lodash'

import normalizeLang from '../utils/normalize-lang'
import i18nPath from '../utils/i18n-path'

function normalizeAlt(alt) {
  if (alt === null || typeof alt === 'undefined') {
    return ''
  }
  return alt
}

function normalizePath(path) {
  if (path === null) {
    return ''
  }
  return path
}

function normalizeOGImage(ogImage) {
  if (!ogImage) {
    return null
  }

  return {
    alt: ogImage.alt,
    dimensions: ogImage.dimensions,
    data: {
      publicURL: ogImage.localFile.publicURL
    }
  }
}

function findSliceType(slices, type) {
  return slices.filter(s => s.slice_type === type)
}

function hasSlice(slices, type) {
  return findSliceType(slices, type).length > 0
}

function heroSliceToHeroData(slice, heroType) {
  const anchorX = slice.primary.anchor_x
  const base = { anchorX }

  if (heroType === 'narrow_hero_image') {
    return {
      ...base,
      showCTAContrastGradient: slice.primary.show_cta_contrast_gradient,
      publicURL:
        slice.primary.image.document[0].data.image.Narrow.localFile.publicURL
    }
  }

  if (heroType === 'wide_hero_image') {
    return {
      ...base,
      useDarkCTAs: slice.primary.use_dark_ctas
    }
  }

  if (heroType === 'card_hero_image') {
    return { ...base }
  }
}

function slicesToHeroValue(slices, heroType) {
  if (!hasSlice(slices, heroType)) {
    return null
  }

  const slice = findSliceType(slices, heroType)[0]
  const variantKey = {
    narrow_hero_image: 'Narrow',
    wide_hero_image: 'Wide',
    card_hero_image: 'Card'
  }[heroType]

  return {
    type: 'image',
    alt: normalizeAlt(slice.primary.image.document[0].data.image.alt),
    datePublished: slice.primary.image.document[0].first_publication_date,
    dimensions:
      slice.primary.image.document[0].data.image[variantKey].dimensions,
    data: {
      image: slice.primary.image.document[0].data.image[variantKey],
      ...heroSliceToHeroData(slice, heroType)
    }
  }
}

function addMeta(page) {
  return state => {
    return {
      ...state,
      uid: page.uid,
      lang: normalizeLang(page.lang),
      datePublished: page.first_publication_date,
      dateModified: page.last_publication_date
    }
  }
}

function addData(page) {
  const lang = normalizeLang(page.lang)
  return state => {
    return {
      ...state,
      data: {
        title: page.data.title,
        path: normalizePath(page.data.path),
        i18nPath: i18nPath(lang, page.data.path),
        breadcrumbText: page.data.breadcrumb_text,
        description: page.data.description,
        segue: page.data.segue,
        footerLinkText: page.data.footer_link_text,
        microDescription: page.data.micro_description
      }
    }
  }
}

function addHeros(page) {
  const slices = page.data.body || []
  return state => {
    return {
      ...state,
      narrowHero: slicesToHeroValue(slices, 'narrow_hero_image'),
      wideHero: slicesToHeroValue(slices, 'wide_hero_image'),
      cardHero: slicesToHeroValue(slices, 'card_hero_image')
    }
  }
}

function addOGManifest(page) {
  const slices = page.data.body || []

  return state => {
    const ogDefaults = {
      data: {
        title: state.data.title.text,
        description: state.data.description.text
      },
      image: state.narrowHero
    }

    if (!hasSlice(slices, 'og_manifest')) {
      return {
        ...state,
        ogManifest: ogDefaults
      }
    }

    const slice = findSliceType(slices, 'og_manifest')[0]

    return {
      ...state,
      ogManifest: {
        data: {
          title: _.defaultTo(slice.primary.og_title, state.data.title.text),
          description: _.defaultTo(
            slice.primary.og_description,
            state.data.description.text
          )
        },
        image: _.defaultTo(
          normalizeOGImage(slice.primary.og_image),
          state.narrowHerImage
        )
      }
    }
  }
}

export default function normalizePage(page) {
  const adapted =
    {}
    |> addMeta(page)
    |> addData(page)
    |> addHeros(page)
    |> addOGManifest(page)

  return adapted
}
