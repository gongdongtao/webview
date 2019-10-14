#include "invoke_interface.h"
#include "cJSON.h"

/* Jumptable for the ui invoke handlers */
static const struct {
	const char *command;
	void (*invoke_handlers)(struct webview *w,const char* callbackName, const char *args);
} commands[] = {
	{"hello",invoke_hello}
};

void external_invoke_interface(struct webview *w, const char *arg)
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

void real_invoke_interface(struct InvokeData* data)
{
	if (!data) return;

	struct webview *w = data->w;
	char* arg = data->arg;

	cJSON * json = cJSON_Parse(arg);
	cJSON * callbackJs = NULL;
	char * cfunName = NULL;
	char * callbackName = NULL;
	char * paras = NULL;
	if (json) {
		cJSON * jsFunName = cJSON_GetObjectItem(json, "name");
		cfunName = cJSON_GetStringValue(jsFunName);
		callbackJs = cJSON_GetObjectItem(json, "callbackName");
		callbackName = callbackJs->valuestring;
		cJSON * paramsJs = cJSON_GetObjectItem(json, "params");
		if (paramsJs) {
			paras = cJSON_Print(paramsJs);
		}
	}
	for (int i = 0; commands[i].command; i++) {
		if (strcmp(cfunName, commands[i].command) == 0) {
			commands[i].invoke_handlers(w, callbackName, paras);
			break;
		}
	}
}

void invoke_hello(struct webview *w, const char* callbackName, const char *args)
{
	cJSON * rootJs = cJSON_CreateObject();
	cJSON * callbackJs = cJSON_CreateString(callbackName);
	cJSON_AddItemToObject(rootJs, "callbackName", callbackJs);
	cJSON * codeJs = cJSON_CreateNumber(200);
	cJSON * paramsJs = cJSON_CreateObject();

	cJSON_AddItemToObject(paramsJs, "code", codeJs);
	cJSON_AddItemToObject(rootJs, "params", paramsJs);
	char * strjson = cJSON_Print(rootJs);
	char * strResult = (char *)malloc(sizeof(strjson) + 150);
	sprintf(strResult, "resultHandle(%s)", strjson);
	//call webview ui function
	webview_eval(w, strResult);
	free(strResult);
}