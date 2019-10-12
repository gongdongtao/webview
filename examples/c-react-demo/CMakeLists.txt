cmake_minimum_required(VERSION 2.8)

project(c_react_demo)

#set(CMAKE_CXX_STANDARD 11)

set(SRC_FILES  "cJSON.c")
FILE(GLOB SC_FILES "*.c" "*.h")
add_subdirectory(${CMAKE_CURRENT_SOURCE_DIR}/../.. ${CMAKE_CURRENT_BINARY_DIR}/webview)
add_executable(c_react_demo WIN32 MACOSX_BUNDLE main.c  ${SRC_FILES})

find_package(Threads REQUIRED)
target_link_libraries(c_react_demo PUBLIC webview ${CMAKE_THREAD_LIBS_INIT})
