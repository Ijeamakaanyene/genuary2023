library(dplyr)
library(ggplot2)

seed = 100
set.seed(seed)

width = 70
height = 50

y_init = seq(0, height, by = 0.5)
x_init = seq(0, width, by = 3)
y_keep = seq(0, height, by = 1.5)

amplitude = .75

grid = 
  expand.grid(x = x_init,
              y = y_init) %>%
  mutate(id = y) %>%
  mutate(y = y + sin(x)*amplitude) %>%
  filter(id %in% y_keep) %>%
  arrange(id, x) %>%
  group_by(id) %>%
  mutate(xend = lead(x),
         yend = lead(y)) %>%
  ungroup() %>%
  group_by(id) %>%
  slice_sample(prop = 0.65) %>%
  ungroup() %>%
  filter(is.na(xend) == FALSE)


ggplot() +
  geom_segment(data = grid,
               aes(x = x,
                   y = y,
                   xend = xend,
                   yend = yend)) +
  geom_point(data = grid,
               aes(x = x,
                   y = y),
             size = .25) +
  geom_point(data = grid,
             aes(x = xend,
                 y = yend),
             size = .25) +
  coord_equal(xlim = c(0, 70),
              ylim = c(0, 50)) +
  theme_void() +
  theme(panel.background = element_rect(fill = "white",
                                        color = "white"))

ggsave(paste0("jan15_", seed, ".png"),
       plot = last_plot(), 
       device = "png", 
       path = "~/repos/genuary2023/JAN15_R/", 
       width = 7*2,
       height = 5*2, 
       units = "in") 
