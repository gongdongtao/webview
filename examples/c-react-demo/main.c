#ifdef __cplusplus
extern "C" {
#endif

#define WEBVIEW_IMPLEMENTATION
#include <webview.h>
#include "cJSON.h"
#include "utils.h"
#include "invoke_interface.h"

#ifdef WIN32
int WINAPI WinMain(HINSTANCE hInt, HINSTANCE hPrevInst, LPSTR lpCmdLine,
	int nCmdShow) {
#else
int main() {
#endif

	struct webview webview;
	memset(&webview, 0, sizeof(webview));
	char* strDir = getCurrentPath();
	char strPath[1024];
	sprintf(strPath, "file://%s%s", strDir, "/ui/index.html");
	printf("%s", strPath);
	webview.title = "VLAN";
	webview.url = strPath;// "http://conductor.vlan.cn";//"http://localhost:3000";//strPath;
	webview.width = 1020;
	webview.height = 690;
	webview.resizable = 0;
	webview.external_invoke_cb = external_invoke_interface;
	//webview.userdata = &timer;

	webview_init(&webview);
	while (webview_loop(&webview, 1) == 0)
		;
	webview_exit(&webview);
	return 0;
}

#ifdef __cplusplus
extern "C"
}
#endif