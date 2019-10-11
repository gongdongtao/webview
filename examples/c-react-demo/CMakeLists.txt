cmake_minimum_required(VERSION 2.8)

project(timer)

set(CMAKE_CXX_STANDARD 11)

set(SRC_FILES  "cJSON.c")
FILE(GLOB SC_FILES "*.cpp" "*.h")
add_subdirectory(${CMAKE_CURRENT_SOURCE_DIR}/../.. ${CMAKE_CURRENT_BINARY_DIR}/webview)
add_executable(timer WIN32 MACOSX_BUNDLE main.cc  ${SRC_FILES})

find_package(Threads REQUIRED)
target_link_libraries(timer PUBLIC webview ${CMAKE_THREAD_LIBS_INIT})
