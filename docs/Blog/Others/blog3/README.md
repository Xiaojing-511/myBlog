## git提交代码(解决冲突)
> 2020-04-19 21:39:38 
<br>分类专栏：git github

在本地修改与远程代码无冲突的情况下，优先使用：pull->commit->push
在本地修改与远程代码有冲突的情况下，优先使用：commit->pull->push

git pull相当于git fetch和git merge。其意思是先从远程下载git项目里的文件，然后将文件与本地的分支进行merge。pull是本地有repository时，将远程repository里新的commit数据(如有的话)下载过来，并且与本地代码merge