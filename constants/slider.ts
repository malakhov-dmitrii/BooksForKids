export const baseSliderMobileSettings = {
  dots: true,
  infinite: true,
  slidesToScroll: 1,
  slidesToShow: 1,
  variableWidth: true,
  speed: 500,
  // autoplay: true,
  arrows: false,
  
}

export const baseSettingsViewedSimilarSlider = {
  dots: false,
  infinite: false,
  slidesToScroll: 1,
  slidesToShow: 3,
  variableWidth: false,
  speed: 500,
  autoplay: false,
  arrows: false,
  responsive: [
    {
      breakpoint: 460,
      settings: {
        slidesToShow: 2,
    }
  }
  ]
}
