type SiteImageSource = {
  url: string
  width: number
}

type SiteImage = {
  src: string
  width: number
  height: number
  sources: SiteImageSource[]
}

type ResponsiveSiteImageProps = {
  image: SiteImage
  alt?: string
  className?: string
  imageClassName?: string
  sizes: string
  loading?: "eager" | "lazy"
  fetchPriority?: "high" | "low" | "auto"
  decorative?: boolean
}

const airbnbImageBase = "/airbnb-turnover"

function makeAirbnbImage(name: string, width: number, height: number): SiteImage {
  return {
    src: `${airbnbImageBase}/${name}.jpg`,
    width,
    height,
    sources: [480, 768, 1080, 1280].map((sourceWidth) => ({
      url: `${airbnbImageBase}/${name}-${sourceWidth}.webp`,
      width: sourceWidth,
    })),
  }
}

export const airbnbSiteImages = {
  hero: makeAirbnbImage("bedroom-towels", 1800, 1200),
  secondary: makeAirbnbImage("housekeeper-towels", 1400, 2100),
  window: makeAirbnbImage("clean-bedroom", 1600, 1067),
  proof: makeAirbnbImage("bathroom-towels", 1400, 939),
}

function srcSetFor(image: SiteImage) {
  return image.sources.map((source) => `${source.url} ${source.width}w`).join(", ")
}

export function ResponsiveSiteImage({
  image,
  alt = "",
  className,
  imageClassName,
  sizes,
  loading = "lazy",
  fetchPriority,
  decorative = false,
}: ResponsiveSiteImageProps) {
  return (
    <picture className={className}>
      <source type="image/webp" srcSet={srcSetFor(image)} sizes={sizes} />
      <img
        src={image.src}
        alt={decorative ? "" : alt}
        width={image.width}
        height={image.height}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
        className={imageClassName}
        aria-hidden={decorative || undefined}
      />
    </picture>
  )
}
