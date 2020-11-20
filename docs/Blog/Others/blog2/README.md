## Git初学者的实践总结（摘自廖老师）
> 2020-04-19 21:39:38 
<br>分类专栏：git github


本文摘自廖老师的Git教程

当你已经安装好Git后，进入Git Bash，会提示要输入用户名和邮箱。

```bash
$ git config --global user.name "Your Name"
$ git config --global user.email "xxx@xxx.com"
```
在设置好你的名字和邮箱后，可以通过命令`pwd`来查看当前的目录。
**创建版本库**
用`cd`来锁定到你要添加版本库的路径

```bash
$ cd /e/Git
```
可以再用`pwd`来查看路径是否正确，确定好后就可以用命令`mkdir`添加你的版本库了(当然你可以手动在Git下创建，请尽量使用英文起名来避免产生麻烦)

```bash
$ mkdir learngit
$ cd learngit
$ pwd
/e/Git/learngit
```
使用`git init`命令把这个目录变成Git可以管理的仓库

```bash
$ git init
```
**把文件添加到版本库**
Windows用户请不要使用自带的**记事本**编辑任何文本文件（可能会遇到很多问题，因为开发团队的一点点画蛇添足），所以推荐使用免费的Notepad++来编辑文本（注意将默认编码设置为UTF-8 without BOM）。
注：编写的文件（如：readme.txt）要在learngit目录下才能被Git管理。
此时编写好的文件处在工作区，要将readme.txt添加到版本库需要两步。
![暂存区](https://img-blog.csdnimg.cn/20200419212903110.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ2MzYzNzkw,size_16,color_FFFFFF,t_70#pic_center)
第一步：使用命令`git add `将文件添加到暂存区（版本库的左部分），此步还未提交到分支，只是暂存

```bash
$ git add readme.txt
```
执行命令后，没有任何显示证明你是对的（没有消息就是最好的消息），此时可以用命令`git status`来查看当前仓库状态，出现一堆字表示还未将该文件提交到仓库。
第二步：执行`git commit`命令将文件提交到分支（版本库的右部分）

```bash
$ git commit -m "你对本次改动的注释"
```
此处若不写-m "注释"，则执行后会跳到Vim,所以为了带来不必要的麻烦，也为了给自己更清晰的改动思路，把注释写上还是好的。
此时再用命令`git status`查看仓库的状态，则会显示working tree clean,表示暂存区的所有文件都已经提交了。因为commit可以提交多个文件，所以你可以添加多个文件到暂存区后一起提交。（这就是为什么要分两步提交的一个原因了）

```bash
$ git add readme.txt
$ git add test.txt
$ git commit -m "add 2 files"
```
**小结：**
初始化仓库：`git init`
添加文件到仓库：

```bash
$ git add readme.txt
$ git commit -m "add a file"
```
到这里你可以去实践一下啦
**修改及再次提交**
我们在Notepad++中修改文件（删去一个单词）

```handlebars
Git is a version control system.
Git is free software.
```

修改之后的文件需要再次提交（同样是那两步），我们使用命令`git status`可以查看当前仓库的状态，它告诉我们readme.txt文件被修改了

```bash
$ git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   readme.txt

no changes added to commit (use "git add" and/or "git commit -a")
```

在提交之前我们可以使用命令`git diff`来查看具体修改的位置及内容

```bash
$ git diff readme.txt 
diff --git a/readme.txt b/readme.txt
index 46d49bf..9247db6 100644
--- a/readme.txt
+++ b/readme.txt
@@ -1,2 +1,2 @@
-Git is a version control system.
+Git is a distributed version control system.
 Git is free software. 
 ```
这里我们可以看到将原来的句子Git is a version control system.添加了一个词distributed，后面的一个句子没有改变。
再我们确定了修改的内容之后就可以提交了，这里不再重复，如果你有些忘记了，请翻回上边把文件添加到版本库哦~
**版本回退**
手滑误删是最常见的事了，不过在Git中总是可以补救的
使用命令`git log`查看提交历史，即查看都有哪些版本

```bash
$ git log
commit 1094adb7b9b3807259d8cb349e7df1d4d6477073 (HEAD -> master)
Author: Michael Liao <askxuefeng@gmail.com>
Date:   Fri May 18 21:06:15 2018 +0800

    append GPL

commit e475afc93c209a690c39c13a46716e8fa000c366
Author: Michael Liao <askxuefeng@gmail.com>
Date:   Fri May 18 21:03:36 2018 +0800

    add distributed

commit eaadf4e385e865d25c48e7ca9c8395c3f7dfaef0
Author: Michael Liao <askxuefeng@gmail.com>
Date:   Fri May 18 20:59:18 2018 +0800

    wrote a readme file
```
在commit后面的一串数字是版本号，我们可以通过版本号来实现回退版本，若你觉得显示的太繁琐可以在命令后加参数即`git log --pretty=oneline`来显示出一行（版本号及你的注释）

```handlebars
$ git log --pretty=oneline
1094adb7b9b3807259d8cb349e7df1d4d6477073 (HEAD -> master) append GPL
e475afc93c209a690c39c13a46716e8fa000c366 add distributed
eaadf4e385e865d25c48e7ca9c8395c3f7dfaef0 wrote a readme file
```
下面我们使用命令`git reset `回退版本（后面还有它的另一个功能）

```bash
$ git reset --hard HEAD^
HEAD is now at e475afc add distributed
```
这里的参数`--hard`会在以后讲到，请先用着嘿嘿，`HEAD`表示当前版本，类似指针指向当前版本，则`HEAD^`是上一个版本，类似`HEAD^^`则是上上个版本，若十多个则可以使用`HEAD~10`则是往上10个版本。
这里我们可以使用命令`cat`来查看文件内容，看看是否回退了版本。

```bash
$ cat readme.txt
Git is a distributed version control system.
Git is free software.
```
这时我们还可以找回之前回退被顶掉的版本，用版本号来指定回到版本,只需版本号的前几位即可。翻回之前查看的版本号

```bash
$ git reset --hard 1094a
HEAD is now at 83b0afe append GPL
```
此时的版本号已经改变
可见我们可以通过查看版本号来实现回到指定的版本，但如果我们找不到被顶掉的版本号怎么办？通过指令`git reflog`来查看你的每一步命令

```bash
$ git reflog
e475afc HEAD@{1}: reset: moving to HEAD^
1094adb (HEAD -> master) HEAD@{2}: commit: append GPL
e475afc HEAD@{3}: commit: add distributed
eaadf4e HEAD@{4}: commit (initial): wrote a readme file
```
这时通过查看命令我们可以看到最新commit的是1094a,我们就可以通过版本号来实现了。
**小结**
查看提交历史：`git log`，便于回退版本
查看命令历史：`git reflog`，便于找回版本
**撤销修改**
这里有两种情况
一种情况是在本地修改也就是在工作区，还没有用`git add readme.txt`来将文件添加到暂存区时，这时使用命令`git checkout -- readme.txt`来撤销会返回到和版本库（暂存区和提交区）一样的状态，也就是把在工作区的修改撤销了。

另一种情况是在已经添加到暂存区，此时使用命令`git reset HEAD readme.txt`修改，撤销会将暂存区的修改撤销掉然后重新放回到工作区。`git reset`命令不仅可以回退版本，也可以将暂存区的修改回退到工作区。这时用`HEAD`表示最新版本。

总之就是返回到最近的一次`git add`或`git commit`时的状态（需要理解一下）
**小结**
撤销工作区的修改：`git checkout -- <filename>`
撤销暂存区的修改：`git reset HEAD <filename>`
若已提交，请参考回退版本。

若你还是觉得不懂的话请移步廖老师的Git教程，讲的真的很好！
(https://www.liaoxuefeng.com/wiki/896043488029600/896067008724000)

还会陆续通过自身实践补充，若有错误的地方请及时与我沟通或下方评论。本人是小白一个，希望会得到鼓励嘻嘻。

下篇我会总结如何将本地仓库关联到Github上的远程仓库、远程库克隆到本地及分支的管理等。后续还会出详细的Github Desktop的使用来代替较复杂的Git（但是若是你基本熟悉了Git的命令会更加快速的接受Github Desktop）。