square_util = 
  function(x, y, width){
    tibble(x = c(x, x + width, x + width, x),
           y = c(y, y, y + width, y + width))
  }


hatch_lines = 
  function(x, y, width, num_lines, type){
    
    x1 = x
    x2 = x + width
    x3 = x + width
    x4 = x
    y1 = y
    y2 = y
    y3 = y + width
    y4 = y + width
    
    # horizontal lines
    horizontal_lines = 
      bind_cols(x = seq(x1, x4, length.out = num_lines),
                xend = seq(x2, x3, length.out = num_lines),
                y = seq(y1, y4, length.out = num_lines),
                yend = seq(y2, y3, length.out = num_lines))
    
    # vertical lines
    vertical_lines =
      bind_cols(x = seq(x1, x2, length.out = num_lines),
                xend = seq(x4, x3, length.out = num_lines),
                y = seq(y1, y2, length.out = num_lines),
                yend = seq(y4, y3, length.out = num_lines))
    
    
    # diagnol lines bottom left to top right
    diag1_lines =
      bind_cols(x = c(seq(x4, x1, length.out = num_lines),
                      seq(x1, x2, length.out = num_lines)),
                xend = c(seq(x4, x3, length.out = num_lines),
                         seq(x3, x2, length.out = num_lines)),
                y = c(seq(y4, y1, length.out = num_lines),
                      seq(y1, y2, length.out = num_lines)),
                yend = c(seq(y4, y3, length.out = num_lines),
                         seq(y3, y2, length.out = num_lines)))
    
    # diagnol lines from bottom right to top left
    diag2_lines = 
      bind_cols(x = c(seq(x1, x2, length.out = num_lines),
                      seq(x2, x3, length.out = num_lines)),
                xend = c(seq(x1, x4, length.out = num_lines),
                         seq(x4, x3, length.out = num_lines)),
                y = c(seq(y1, y2, length.out = num_lines),
                      seq(y2, y3, length.out = num_lines)),
                yend = c(seq(y1, y4, length.out = num_lines),
                         seq(y4, y3, length.out = num_lines)))
    
    # if(type == 1){
    #   return(bind_rows(horizontal_lines,
    #                    vertical_lines))
    # }
    
    # if(type == 2){
    #   return(bind_rows(horizontal_lines,
    #                    diag1_lines))
    # }
    # 
    # if(type == 3){
    #   return(bind_rows(horizontal_lines,
    #                    diag2_lines))
    # }
    # 
    # if(type == 4){
    #   return(bind_rows(vertical_lines,
    #                    diag1_lines))
    # }
    # 
    # if(type == 5){
    #   return(bind_rows(vertical_lines,
    #                    diag2_lines))
    # }
    # 
    if(type == 1){
      return(bind_rows(diag1_lines,
                       diag2_lines))
    }
    
    # if(type == 2){
    #   return(vertical_lines)
    # }
    # 
    # if(type == 3){
    #   return(horizontal_lines)
    # }
    
    if(type == 2){
      return(diag1_lines)
    }

    if(type == 3){
      return(diag2_lines)
    }
    
    
  }