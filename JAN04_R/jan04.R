library(dplyr)
library(ggplot2)

plus_util = function(x0, y0, radius, angle, type){
  theta = seq(0, 2*pi, length.out = 5) + angle
  
  if(type == 0){
    output = 
      tibble(x = NA,
             y = NA)
    
  } else if(type == 1){
    output = 
      tibble(x = c(x0 + sin(theta[1]) * radius,
                   x0),
             y = c(y0 + cos(theta[1]) * radius,
                   y0))
    
  } else if(type == 2){
    output = 
      tibble(x = c(x0 + sin(theta[1]) * radius,
                   x0,
                   x0 + sin(theta[2]) * radius,
                   x0),
             y = c(y0 + cos(theta[1]) * radius,
                   y0,
                   y0 + cos(theta[2]) * radius,
                   y0))
    
  } else if(type == 3){
    output = 
      tibble(x = c(x0 + sin(theta[1]) * radius,
                   x0,
                   x0 + sin(theta[2]) * radius,
                   x0,
                   x0 + sin(theta[3]) * radius,
                   x0),
             y = c(y0 + cos(theta[1]) * radius,
                   y0,
                   y0 + cos(theta[2]) * radius,
                   y0,
                   y0 + cos(theta[3]) * radius,
                   y0))
  } else if(type == 4){
    output = 
      tibble(x = c(x0 + sin(theta[1]) * radius,
                   x0,
                   x0 + sin(theta[2]) * radius,
                   x0,
                   x0 + sin(theta[3]) * radius,
                   x0,
                   x0 + sin(theta[4]) * radius,
                   x0),
             y = c(y0 + cos(theta[1]) * radius,
                   y0,
                   y0 + cos(theta[2]) * radius,
                   y0,
                   y0 + cos(theta[3]) * radius,
                   y0,
                   y0 + cos(theta[4]) * radius,
                   y0))
  }
  
  return(output)
  
}

seed_num = sample(1:99999, size = 1)
set.seed(seed_num)
freq = round(runif(1, min = 0.005, 0.1), 3)


grid = 
  expand.grid(x = seq(2, by = 1, length.out = 17),
              y = seq(2, by = 1, length.out = 26)) %>%
  mutate(width = 1) %>%
  mutate(noise = 
           ambient::gen_perlin(x = x,
                                    y = y,
                                    frequency = freq,
                              seed = seed_num) * 
           ambient::gen_perlin(x = x,
                               y = y,
                               frequency = freq,
                               seed = seed_num),
         subdivide = ntile(noise, 5) - 1)

plus_grid = 
  purrr::map_dfr(
    1:nrow(grid),
    ~bind_cols(
      id = .x,
      plus_util(x0 = grid$x[.x], 
                y0 = grid$y[.x], 
                radius = grid$width[.x], 
                angle = 0, 
                type = grid$subdivide[.x])
    )
  )


ggplot(data = plus_grid) +
  geom_polygon(aes(x = x,
                   y = y,
                   group = id),
               fill = NA,
               color = "black") +
  coord_equal() +
  theme_minimal() +
  scale_x_continuous(breaks = seq(1, 20, by = 1)) +
  scale_y_continuous(breaks = seq(1, 28, by = 1))

ggsave(paste0("jan_04",
              seed_num, 
              "_",
              freq,
              ".png"), 
       plot = last_plot(), 
       device = "png", 
       path = "~/repos/genuary2023/JAN04", 
       width = 6,
       height = 9,
       units = "in"
       )



