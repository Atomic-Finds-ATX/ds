import React from 'react';
import { Tag } from './Tag.jsx';

/**
 * ProductCard component matching Atomic Finds ATX design system.
 * Furniture is always the hero: generous image framing with quiet, structured chrome.
 */
export function ProductCard({
  name,
  era,
  material,
  status = 'available', // 'available' | 'sold'
  price,
  imageSrc,
  imageAlt,
  story,
  nachoTip,
  nachoImageSrc,
  passport,
  className = '',
  style = {},
  onSelect,
  ...props
}) {
  return (
    <article
      className={`af-product ${className}`.trim()}
      style={style}
      onClick={onSelect}
      {...props}
    >
      <div className="af-product__media">
        {imageSrc && <img src={imageSrc} alt={imageAlt || name} loading="lazy" />}
        <div className="af-product__status">
          <Tag variant={status === 'sold' ? 'sold' : 'available'}>
            {status === 'sold' ? 'Sold' : 'Available'}
          </Tag>
        </div>
      </div>

      <div className="af-product__body">
        <h3 className="af-product__name">
          {name}
        </h3>

        {story && <p className="af-product__story">{story}</p>}

        <div className="af-product__meta">
          {era && <Tag variant="era">{era}</Tag>}
          {material && <Tag variant="material">{material}</Tag>}
          {price && <Tag variant="accent">{price}</Tag>}
        </div>

        {nachoTip && (
          <div className="af-product__nacho">
            {nachoImageSrc && <img src={nachoImageSrc} alt="Nacho Guide" />}
            <p>"{nachoTip}"</p>
          </div>
        )}
      </div>
    </article>
  );
}
