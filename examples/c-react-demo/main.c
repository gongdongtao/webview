#ifdef __cplusplus
extern "C" {
#endif


#define WEBVIEW_IMPLEMENTATION
#include <webview.h>
#include "cJSON.h"


struct InvokeData {
	struct webview *w;
	char * arg;
};
static void real_invoke_interface(struct InvokeData* data);

static void extener_invoke_interface(struct webview *w, const char *arg)
{
	struct InvokeData * indata = (struct InvokeData *)malloc(sizeof(struct InvokeData));
	if (indata)
	{
		indata->w = w;
		indata->arg = (char*)malloc(strlen(arg) + 1);
		strcpy(indata->arg, arg);
		//thread(real_invoke_interface, indata).detach();
		real_invoke_interface(indata);
	}
}

static void real_invoke_interface(struct InvokeData* data)
{
	if (!data) return;

	struct webview *w = data->w;
	char* arg = data->arg;

	cJSON * json = cJSON_Parse(arg);
	cJSON * callbackJs = NULL;
	char * cfunName = NULL;
	char* callbackName = NULL;
	if (json) {
		cJSON * jsFunName = cJSON_GetObjectItem(json, "name");
		cfunName = cJSON_GetStringValue(jsFunName);
		callbackJs = cJSON_GetObjectItem(json, "callbackName");
		callbackName = callbackJs->valuestring;
	}
	if (strcmp(cfunName, "hello") == 0) {
		cJSON * rootJs = cJSON_CreateObject();
		
		cJSON_AddItemToObject(rootJs, "callbackName", callbackJs);
		cJSON * codeJs = cJSON_CreateNumber(200);
		cJSON * paramsJs = cJSON_CreateObject();

		cJSON_AddItemToObject(paramsJs, "code", codeJs);
		cJSON_AddItemToObject(rootJs,"params", paramsJs);
		char * strjson = cJSON_Print(rootJs);
		char * strResult = (char *)malloc(sizeof(strjson)+150);
		sprintf(strResult, "resultHandle(%s)", strjson);

		webview_eval(w, strResult);
		free(strResult);
	}
}


void substr(char *source, int start, int length, char *dest)
{
	int k;
	int i;
	int j = 0;
	char *p;
	k = strlen(source);
	p = source;
	for (i = start - 1; i<start - 1 + length; i++)//从第n-1位置开始，截取m个字符
		dest[j++] = *(p + i);
	dest[j] = '\0';
	printf("the new string is:");
	puts(dest);
	printf("\n");

}

char * getCurrentPath()
{
#ifdef WIN32
	TCHAR path[1024];
	GetModuleFileName(NULL, path, 1024);
	char * pos = strrchr(path,'\\');
	char strPath[1024];
	substr(path, 1, pos - path + 1, strPath);
	return strPath;
#else
	char buf[0];
	uint32_t size = 0;
	int res = _NSGetExecutablePath(buf, &size);

	char* path = (char*)malloc(size + 1);

	path[size] = 0;
	res = _NSGetExecutablePath(path, &size);

	char* p = strrchr(path, '/');
	*p = 0;
	return path;

#endif
}


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
	sprintf(strPath, "%s%s", strDir, "ui/index.html");

	webview.title = "VLAN";
	webview.url = "http://localhost:3000";// "http://conductor.vlan.cn";//"http://localhost:3000";//strPath;
	webview.width = 1020;
	webview.height = 690;
	webview.resizable = 0;
	webview.external_invoke_cb = extener_invoke_interface;
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