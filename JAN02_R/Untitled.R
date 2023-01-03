library(dplyr)
library(ggplot2)


square_util = function(x0, y0, width){
  tibble(x = c(x0, x0 + width, x0 + width, x0),
         y = c(y0, y0, y0 + width, y0 + width))
}


build_square_grid = function(x0, y0, width, subdivide){
  if(subdivide == 1){
    dplyr::tibble(
      x = c(x0, x0 + width/2, x0 + width/2, x0),
      y = c(y0, y0, y0 + width/2, y0 + width/2),
      width = width/2
    )
    
  } else if(subdivide == 0){
    dplyr::tibble(
      x = x0,
      y = y0,
      width = width
    )
  }
}




grid = 
  expand.grid(x = seq(0, by = 10, length.out = 6),
              y = seq(0, by = 10, length.out = 6)) %>%
  mutate(width = 10) %>%
  mutate(noise = ambient::gen_waves(x = x,
                                    y = y,
                                    frequency = 0.05),
         subdivide = ntile(noise, 2) - 1)

subdivide_grid = 
  purrr::map_dfr(1:nrow(grid),
                 ~build_square_grid(
                   x0 = grid$x[.x],
                   y0 = grid$y[.x],
                   width = grid$width[.x],
                   subdivide = grid$subdivide[.x]
                 ))

square_grid = 
  purrr::map_dfr(1:nrow(subdivide_grid),
                 ~bind_cols(
                   id = .x,
                   square_util(x0 = subdivide_grid$x[.x],
                               y0 = subdivide_grid$y[.x],
                               width = subdivide_grid$width[.x])))

ggplot() +
  geom_polygon(data = square_grid,
               aes(x = x,
                   y = y,
                   group = id),
               fill = NA,
               color = "black") +
  coord_equal()



