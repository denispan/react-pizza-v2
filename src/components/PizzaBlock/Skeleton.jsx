import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = () => (
  <div className="pizza-block-wrapper">
    <ContentLoader
      speed={2}
      width={280}
      height={470}
      viewBox="0 0 280 470"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      className="pizza-block"
    >
      <circle cx="132" cy="127" r="126"/>
      <rect x="0" y="266" rx="10" ry="10" width="280" height="27"/>
      <rect x="0" y="311" rx="10" ry="10" width="280" height="93"/>
      <rect x="0" y="428" rx="10" ry="10" width="90" height="27"/>
      <rect x="119" y="415" rx="25" ry="25" width="153" height="45"/>
    </ContentLoader>
  </div>
)

export default Skeleton
