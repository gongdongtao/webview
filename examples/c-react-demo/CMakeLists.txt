cmake_minimum_required(VERSION 2.8)

project(c_react_demo)

#set(CMAKE_CXX_STANDARD 11)

set(SRC_FILES  "cJSON.c" "invoke_interface.h" "invoke_interface.c" "utils.h" "utils.c")
FILE(GLOB SC_FILES "*.c" "*.h")
add_subdirectory(${CMAKE_CURRENT_SOURCE_DIR}/../.. ${CMAKE_CURRENT_BINARY_DIR}/webview)
add_executable(c_react_demo WIN32 MACOSX_BUNDLE main.c  ${SRC_FILES})

find_package(Threads REQUIRED)
target_link_libraries(c_react_demo PUBLIC webview ${CMAKE_THREAD_LIBS_INIT})

if(APPLE)
add_custom_command(TARGET c_react_demo POST_BUILD
	COMMAND echo "mkdir $<TARGET_FILE_DIR:c_react_demo>/ui"
	COMMAND rm -Rf "$<TARGET_FILE_DIR:c_react_demo>/ui"	
	COMMAND mkdir "$<TARGET_FILE_DIR:c_react_demo>/ui"
	COMMAND ${CMAKE_COMMAND} -E copy_directory ${CMAKE_SOURCE_DIR}/build $<TARGET_FILE_DIR:c_react_demo>/ui
)
else()
add_custom_command(TARGET c_react_demo POST_BUILD
	COMMAND echo "mkdir $<TARGET_FILE_DIR:c_react_demo>/ui"
	COMMAND rd /s/q "$<TARGET_FILE_DIR:c_react_demo>/ui"	
	COMMAND ${CMAKE_COMMAND} -E copy_directory ${CMAKE_SOURCE_DIR}build $<TARGET_FILE_DIR:c_react_demo>/ui
   )
endif()