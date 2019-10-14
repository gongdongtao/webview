#ifndef INVOKE_INTERFACE_H
#define INVOKE_INTERFACE_H

#include <webview.h>

struct InvokeData {
	struct webview *w;
	char * arg;
};
extern void external_invoke_interface(struct webview *w, const char *arg);
extern void real_invoke_interface(struct InvokeData* data);

extern void invoke_hello(struct webview *w, const char *arg);
#endif