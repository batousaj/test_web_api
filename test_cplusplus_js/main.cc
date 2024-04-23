// main.cpp
#include <iostream>
#include <stdio.h>
// #include <emscripten.h>

// EMSCRIPTEN_KEEPALIVE
extern "C" {
    void sayHello() {
        std::cout << "Hello from C++!" << std::endl;
    }

    int sum(int a, int b) {
        return a + b;
    }

    int substract(int a, int b) {
        return abs(a - b);
    }
}