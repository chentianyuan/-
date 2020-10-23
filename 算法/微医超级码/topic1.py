def f(origin, n):
    if n == 1:
        return origin
    result = ''
    line_result = ''
    for i in range(len(origin)):
        scale = n
        if origin[i] == '\n':
            line_result += origin[i]
            line_result = line_result*n
            result +=line_result
            line_result = ''
        else:
          while scale:
            line_result += origin[i]
            scale -= 1
    return result
input_sample = input()
result = f(input_sample,2)
print(result)
