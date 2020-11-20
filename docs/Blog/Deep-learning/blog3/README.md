## Tensorflow 2.0 利用十三层卷积神经网络实现cifar 100训练（理论+实战）
> 2020-9-27 21:29:11 
<br>分类专栏：深度学习 VGG13 tensorflow


VGG模型是2014年ILSVRC竞赛的第二名，第一名是GoogLeNet。但是VGG模型在多个迁移学习任务中的表现要优于googLeNet。而且，从图像中提取CNN特征，VGG模型是首选算法。“VGG”代表了牛津大学的Oxford Visual Geometry Group

## 主要思路
网络模型是由10层卷积层结合3层全连接层构成，我们通过卷积获取特征后通过max-pooling池化方法减少FeatureMap中不重要的样本，把原图模糊缩减至原来的1/4（根据池化核的尺寸和移动步长计算），再用全连接层把所有卷积得到的特征整合到一起（把这些局部特征进行随机组合，我们就可以输出很多奇奇怪怪的组合图片，只要全连接层够大，我们就一定能得到一张组合图片的样子最接近原图像）通过循环的卷积池化和全连接输出计算loss更新梯度，测试集使用softmax计算各类的概率并选出最大概率作为预测值来计算准确率。

> 输入数据集cifar 10数据集中的标签只有10类，而cifar 100数据集对每一类又划分成了10小类，总共有100个类别，每个类600张图片，总共有60000张图片。其中50000张是训练集，10000张作为测试集32 * 32尺寸。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120202620413.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ2MzYzNzkw,size_16,color_FFFFFF,t_70#pic_center)
VGG特点及训练层级
1. VGG全部使用3*3卷积核、2*2池化核，不断加深网络结构来提升性能。
2. A到E网络变深，参数量没有增长很多，参数量主要在3个全连接层。
3. 训练比较耗时的依然是卷积层，因计算量比较大。由于卷积核专注于扩大通道数、池化专注于缩小宽和高，使得模型架构上更深更宽的同时，计算量的增加放缓
4. VGG有5段卷积，每段有2个卷积层，每段尾部用池化来缩小图片尺寸。
5. 每段内卷积核数一样，越靠后的段卷积核数越多：64–128–256–512–512。
6. 训练阶段的三个全连接替换为三个卷积，测试重用训练时的参数，使得测试得到的全卷积网络因为没有全连接的限制，因而可以接收任意宽或高为的输入

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120202755637.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ2MzYzNzkw,size_16,color_FFFFFF,t_70#pic_center)

这里演示训练十次的效果

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120202834810.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ2MzYzNzkw,size_16,color_FFFFFF,t_70#pic_center)

学习该模型心得及收获
1. 通过这样一个网络模型的搭建，加深了我对vgg13神经网络的认识以及tensorflow使用的熟练度。
2. 了解的vgg13 3*3卷积核的优点
（1）多个一样的3*3的卷积层堆叠非常有用
（2）两个3*3的卷积层串联相当于1个5*5的卷积层，即一个像素会跟周围5*5的像素产生关联，感受野大小为5*5。
（3）三个3*3的卷积层串联相当于1个7*7的卷积层，但3个串联的3*3的卷积层有更少的参数量，有更多的非线性变换（3次ReLU激活函数），使得CNN对特征的学习能力更强。
3. 卷积的目的及意义：利用数据集去纠正网络中的参数，让相同或者相近的输入在一定误差的影响下依旧可以输出正确的值。通过卷积神经网络，我们可以使得参数的个数和参数的表达能力达到了一个平衡，即参数个数最小化少，但表达力度会最大化。
4. 学习到了池化的一些概念和思想：通过max-pooling池化方法减少FeatureMap中不重要的样本，把原图模糊缩减至原来的1/4。通过padding填充使它的尺寸恢复到原来的尺寸。

## 附录（源代码）
 

```cpp
import tensorflow as tf
from tensorflow.keras import layers, optimizers, datasets, Sequential
import os
# 程序运行时系统打印的信息
os.environ["CUDA_VISIBLE_DEVICES"]='1'
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'  # 显示warning和error
# 为了使所有ops生成的随机序列在会话中可重复，可以设置一个图级种子:
tf.random.set_seed(2345)

conv_layers = [ # 5 units of conv + max pooling
    #Please build vgg13 network according to de demonstration in readme file, bellow is a instance for unit 1
    #Please complete other parts. (unit 2 to unit 5)
    # vgg13 13层指的是10层卷积层和3层全连接层
    # 一共5个单元的卷积层和池化层，每个单元2个卷积层和一个池化层

    # 卷积层的filter设置越来越高，将高层的特征传给全连接层用来训练模型
    # filter 整数，输出空间的维数(即在“卷积”中输出滤波器的数量)。
    # kernel_size一个整数或2个整数的元组/列表，指定二维卷积窗口的高度和宽度。
    # padding 填充 有效或相同（不区分大小写）
    # activation 激活函数 这个函数的作用是计算激活函数 relu，即 max(features, 0)。将大于0的保持不变，小于0的数置为0。
    # Maxpool是取一个区域内的最大值
    # MaxPool2D 最大池化 output_shape = (input_shape - pool_size + 1) / strides    池化核尺寸 池化窗口的移动步长 边缘0填充

    # unit 1
    layers.Conv2D(64, kernel_size=[3, 3], padding="same", activation=tf.nn.relu),
    layers.Conv2D(64, kernel_size=[3, 3], padding="same", activation=tf.nn.relu),
    layers.MaxPool2D(pool_size=[2, 2], strides=2, padding='same'),

    # unit 2
    layers.Conv2D(128, kernel_size=[3, 3], padding="same", activation=tf.nn.relu),
    layers.Conv2D(128, kernel_size=[3, 3], padding="same", activation=tf.nn.relu),
    layers.MaxPool2D(pool_size=[2, 2], strides=2, padding='same'),

    # unit 3
    layers.Conv2D(256, kernel_size=[3, 3], padding="same", activation=tf.nn.relu),
    layers.Conv2D(256, kernel_size=[3, 3], padding="same", activation=tf.nn.relu),
    layers.MaxPool2D(pool_size=[2, 2], strides=2, padding='same'),

    # unit 4
    layers.Conv2D(512, kernel_size=[3, 3], padding="same", activation=tf.nn.relu),
    layers.Conv2D(512, kernel_size=[3, 3], padding="same", activation=tf.nn.relu),
    layers.MaxPool2D(pool_size=[2, 2], strides=2, padding='same'),

    # unit 5
    layers.Conv2D(512, kernel_size=[3, 3], padding="same", activation=tf.nn.relu),
    layers.Conv2D(512, kernel_size=[3, 3], padding="same", activation=tf.nn.relu),
    layers.MaxPool2D(pool_size=[2, 2], strides=2, padding='same'),

]


def preprocess(x, y):
    # [0~1]
    # 张量数据类型转换
    x = tf.cast(x, dtype=tf.float32) / 255.  # 归一化
    y = tf.cast(y, dtype=tf.int32)  # 把numpy数据转为Tensor
    return x, y

# 数据自动下载加载
(x,y), (x_test, y_test) = datasets.cifar100.load_data()
y = tf.squeeze(y, axis=1)  # 返回一个张量，这个张量是将原始input中所有维度为1的那些维都删掉的结果
y_test = tf.squeeze(y_test, axis=1)
print(x.shape, y.shape, x_test.shape, y_test.shape)

# 数据处理
train_db = tf.data.Dataset.from_tensor_slices((x, y)) # 加载数据
train_db = train_db.shuffle(1000).map(preprocess).batch(128) # 打乱数据  预处理函数 一次放入128个数据

test_db = tf.data.Dataset.from_tensor_slices((x_test, y_test))
test_db = test_db.map(preprocess).batch(64)
# 取出一个sample查看 每个样本数据的尺寸，标签的尺寸，最大值最小值
sample = next(iter(train_db))
print('sample:', sample[0].shape, sample[1].shape,
      tf.reduce_min(sample[0]), tf.reduce_max(sample[0]))


def main():

    # [b, 32, 32, 3] => [b, 1, 1, 512]
    conv_net = Sequential(conv_layers)
# Please add your code in blank
    # 全连接层
    fc_net = Sequential([
        layers.Dense(256, activation=tf.nn.relu), # ---隐层
        layers.Dense(128, activation=tf.nn.relu), # ---隐层
        layers.Dense(100, activation=None), # 输出层 you can try other activation function to evaluate and compare
    ])
# Please add your code in blank
    # 卷积层和池化层
    conv_net.build(input_shape=[None, 32, 32, 3])  # ---
    fc_net.build(input_shape=[None, 512])   # ---
    # 设置优化器，优化学习率
    optimizer = optimizers.Adam(lr=1e-4)

    # [1, 2] + [3, 4] => [1, 2, 3, 4]
    # #每个层键的参数变量结合起来
    variables = conv_net.trainable_variables + fc_net.trainable_variables
    # 训练
    for epoch in range(10):

        for step, (x, y) in enumerate(train_db):

            with tf.GradientTape() as tape:
                # 卷积层和池化层
                # [b, 32, 32, 3] => [b, 1, 1, 512]
                out = conv_net(x)
                # flatten, => [b, 512]
                # 展平
                out = tf.reshape(out, [-1, 512])
                # 全连接层
                # [b, 512] => [b, 100]
                # 我们将展平后的结果传递到全连接层网络fc_net得到预测值
                # 走完卷积层，池化层，全连接层得到输出值
                logits = fc_net(out)

                # 求解Loss值,需要将y的尺寸补齐到logits的尺寸
                # [b] => [b, 100]
                y_onehot = tf.one_hot(y, depth=100)  # 独热 表示各自的概率分布
                # compute loss
                # 交叉熵误差
                # 函数在计算损失函数前，会先内部调用 Softmax函数
                # 多分类的对数损失函数 针对于独热化标签的多分类问题 真实值 预测值（输出层的输出）
                loss = tf.losses.categorical_crossentropy(y_onehot, logits, from_logits=True)
                loss = tf.reduce_mean(loss) # 计算平均交叉熵损失
# Please add your code in blank
            # 反向传播，对所有的层间参数进行求导
            grads = tape.gradient(loss, variables)   # ---
            # 更新梯度
            optimizer.apply_gradients(zip(grads, variables))  # ---
            # 每100个样本打印一次结果
            if step % 100 == 0:
                print(epoch, step, 'loss:', float(loss))



        total_num = 0
        total_correct = 0
        for x, y in test_db:

            out = conv_net(x)
            out = tf.reshape(out, [-1, 512])
            logits = fc_net(out)
            # softmax转换成概率 将logistic的预测二分类的概率的问题推广到了n分类的概率的问题
            prob = tf.nn.softmax(logits, axis=1)  # 输出向量是概率，该样本属于各个类的概率
            # 选择概率最大的作为预测值
            pred = tf.argmax(prob, axis=1)
            pred = tf.cast(pred, dtype=tf.int32)
            # 计算正确预测的数量
            correct = tf.cast(tf.equal(pred, y), dtype=tf.int32)
            correct = tf.reduce_sum(correct)

            total_num += x.shape[0]
            total_correct += int(correct)
        # 计算正确率
        acc = total_correct / total_num
        print(epoch, 'acc:', acc)


if __name__ == '__main__':
    main()

```
