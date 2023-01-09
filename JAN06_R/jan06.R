library(dplyr)
library(ggplot2)
library(tidyr)

# image source: https://happyhappynester.com/artificial-flowers-prettiest-paper-and-silk-flowers/
source("~/repos/genuary2023/JAN06_R/hatch_lines.R")

matrix_image = 
  magick::image_read("~/repos/genuary2023/JAN06_R/example.jpeg") %>%
  magick::image_quantize(max = 40, colorspace = "RGB") %>%
  magick::image_resize("40") %>%
  imager::magick2cimg() %>% 
  imager::RGBtoHSV() %>%
  as.data.frame(wide = "c") %>%  
  dplyr::mutate(hex = hsv(scales::rescale(c.1, from = c(0,360)), c.2, c.3),
                hue = c.1,
                sat = c.2,
                value = c.3) %>%
  dplyr::mutate(type = ntile(value, 3),
                num_lines = ntile(value, 8))

square_hex = 
  purrr::map_dfr(
    1:nrow(matrix_image),
    ~bind_cols(
      id = .x,
      hexcode = matrix_image$hex[.x],
      square_util(x = matrix_image$x[.x],
                  y = matrix_image$y[.x],
                  width = 1)
      )
  )

hatch_hex = 
  purrr::map_dfr(
    1:nrow(matrix_image),
    ~bind_cols(
      id = .x,
      hexcode = matrix_image$hex[.x],
      hatch_lines(x = matrix_image$x[.x],
                  y = matrix_image$y[.x],
                  width = 0.99, 
                  num_lines = matrix_image$num_lines[.x], 
                  type = matrix_image$type[.x])
      )
    )

output = 
  ggplot() +
  geom_polygon(data = square_hex,
               aes(x = x,
                   y = y,
                   fill = hexcode,
                   group = id),
               color = NA,
               alpha = 0.25) +
  geom_segment(data = hatch_hex,
               aes(x = x,
                   xend = xend,
                   y = y,
                   yend = yend,
                   color = hexcode),
               lineend = "round") +
  coord_equal() + 
  scale_colour_identity() +
  scale_fill_identity() +
  theme_void() +
  theme(panel.background = 
          element_rect(fill = "#fbf9f4",
                       color = "#fbf9f4"))


ggsave("jan06.png", 
       plot = output,
       device = "png", 
       path = "~/repos/genuary2023/JAN06_R",
       width = 400*9,
       height = 527*9,
       units = "px"
       )






