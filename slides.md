---
title: Intro to C++
description: Slide to get started in C++
author: J-Donald Tournier
---

# Intro to C++
## Session 1A
### 5CCYB041 - Introduction to C++

---

# First slide

@[right: 10%; bottom: 10%]
Here we talk about *something*, and show **some code**

--

```
#include <iostream>

int main () 
{
  std::cout << "Hello World\n";
  return 0;
}
```

---

#Second slide


Here we talk about something else


@ "code" [left: 20%; top: 30%]
```
#include <iostream>

int main (int argc, char* argv[]) 
{
  std::cout << "Hello World: " << argv[1] << "\n";
  return 0;
}
```
--

> @ "note" [right:10%; top: 20%]
> We can print to the terminal using <br>
> the `std::cout` **output 
> stream**
>
> and another line


@ arrow "note(-.1,.9)-code(.53,.47)"

---

# Meet the team

@"donald" col center-img[width: 20%; height: auto; align: center]
![Donald's mug](assets/donald.jpg)

> with another blockquote
> for completeness
