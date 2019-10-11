#include <chrono>
#include <iomanip>
#include <mutex>
#include <sstream>
#include <thread>

#include <cstdio>
#include <cstring>

#define WEBVIEW_IMPLEMENTATION
#include <webview.h>
#include "cJSON.h"

class Timer {
public:
  int get() {
    this->mutex.lock();
    int n = this->ticks;
    this->mutex.unlock();
    return n;
  }
  void set(int ticks) {
    this->mutex.lock();
    this->ticks = ticks;
    this->mutex.unlock();
  }
  void incr(int n = 1) {
    this->mutex.lock();
    this->ticks = this->ticks + n;
    this->mutex.unlock();
  }
  void start(struct webview *w) {
    this->thread = std::thread(&Timer::run, this, w);
    this->thread.detach();
  }
  void render(struct webview *w) {
    auto n = this->get();
    std::ostringstream jscode;
    jscode << "updateTicks(" << n << ")";
    webview_eval(w, jscode.str().c_str());
  }

private:
  void run(struct webview *w) {
    for (;;) {
      std::this_thread::sleep_for(std::chrono::microseconds(100000));
      this->incr();
      webview_dispatch(w,
                       [](struct webview *w, void *arg) {
                         Timer *timer = static_cast<Timer *>(arg);
                         //timer->render(w);
                       },
                       this);
    }
  }
  std::thread thread;
  std::mutex mutex;
  int ticks = 0;
  struct webview *w;
};

static std::string url_encode(const std::string &value) {
  const char hex[] = "0123456789ABCDEF";
  std::string escaped;
  for (char c : value) {
    if (isalnum(c) || c == '-' || c == '_' || c == '.' || c == '~' ||
        c == '=') {
      escaped = escaped + c;
    } else {
      escaped = escaped + '%' + hex[(c >> 4) & 0xf] + hex[c & 0xf];
    }
  }
  return escaped;
}

static const char *html = R"html(
<!doctype html>
<html>
<body>
  <p id="ticks"></p>
  <button onclick="external.invoke('reset')">reset</button>
  <button onclick="external.invoke('exit')">exit</button>
  <script type="text/javascript">
    function updateTicks(n) {
      document.getElementById('ticks').innerText = 'ticks ' + n;
    }
  </script>
</body>
</html>
)html";

static void timer_cb(struct webview *w, const char *arg) {
  Timer *timer = static_cast<Timer *>(w->userdata);
  cJSON * json = cJSON_Parse(arg);
  char * cfunName = NULL;
  std::string callbackName;
  if (json) {
	  cJSON * jsFunName = cJSON_GetObjectItem(json, "name");
	  cfunName = cJSON_GetStringValue(jsFunName);
	  callbackName = cJSON_GetObjectItem(json, "callbackName")->valuestring;
  }
  if (strcmp(arg, "reset") == 0) {
    timer->set(0);
    //timer->render(w);
  } else if (strcmp(arg, "exit") == 0) {
    webview_terminate(w);
  }
  else if (strcmp(cfunName, "hello") == 0) {
	  std::ostringstream jscode;
	  jscode << "resultHandle(" << "{'callbackName':'"<< callbackName << "','params':{'code':200}})";
	  webview_eval(w, jscode.str().c_str());
  }
}

std::string getCurrentPath()
{
#ifdef WIN32
	TCHAR path[1024];
	::GetModuleFileName(NULL, path, 1024);
	std::string s(path);

	size_t pos = s.find_last_of('\\');
	s = s.substr(0, pos);
	while ((pos = s.find('\\')) != std::string::npos)
	{
		s = s.replace(pos, 1, "/");
	}
	return s;
#else
	std::string s;
	char buf[0];
	uint32_t size = 0;
	int res = _NSGetExecutablePath(buf, &size);

	char* path = (char*)malloc(size + 1);

	path[size] = 0;
	res = _NSGetExecutablePath(path, &size);

	char* p = strrchr(path, '/');
	*p = 0;
	std::string pathTemp;
	pathTemp.append(path);
	free(path);
	return pathTemp;

	return s;
#endif
}

#include <vector>
#include <thread>
#include <future>
#include <numeric>
#include <iostream>
#include <chrono>

int accumulate(std::vector<int>::iterator first,
	std::vector<int>::iterator last)
{
	int sum = std::accumulate(first, last, 0);
	Sleep(10000);
	return sum;
}


#ifdef WIN32
int WINAPI WinMain(HINSTANCE hInt, HINSTANCE hPrevInst, LPSTR lpCmdLine,
                   int nCmdShow) {
#else
int main() {
#endif

  Timer timer;
  struct webview webview = {};
  //std::string html_data = "data:text/html," + url_encode(html);
  std::string strPath;
  std::string strDir = getCurrentPath();
  strPath = strDir + "/ui/index.html";


  webview.title = "VLAN";
  webview.url = "http://localhost:3000";//strPath.c_str();
  webview.width = 1020;
  webview.height = 690;
  webview.resizable = 0;
  webview.external_invoke_cb = timer_cb;
  webview.userdata = &timer;

  webview_init(&webview);
  //timer.start(&webview);
  while (webview_loop(&webview, 1) == 0)
    ;
  webview_exit(&webview);
  return 0;
}
