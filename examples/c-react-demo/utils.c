#include "utils.h"
#ifdef WIN32
#include <Windows.h>
#else
#include <stdint.h>
#endif // 


void substr(char *source, int start, int length, char *dest)
{
	int k;
	int i;
	int j = 0;
	char *p;
	k = strlen(source);
	p = source;
	for (i = start - 1; i<start - 1 + length; i++)
		dest[j++] = *(p + i);
	dest[j] = '\0';
	printf("the new string is:");
	puts(dest);
	printf("\n");

}

char * getCurrentPath()
{
#ifdef WIN32
	char path[1024];
	GetModuleFileName(NULL, path, 1024);
	char * pos = strrchr(path, '\\');
	char strPath[1024];
	substr(path, 1, pos - path, strPath);
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
