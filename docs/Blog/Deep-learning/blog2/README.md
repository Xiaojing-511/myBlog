## Hand-written digits recognition
> 2020-9-19 13:10:29 
<br>分类专栏：深度学习 神经网络 LSTM 


Hand-written digits recognition是将带有手写数字的图片输入到已经训练过的机器，且机器能够很快识别图片中的手写数字，并将之作为输出打印出来。

使用训练集mnist.npz来训练和测试（分为训练集60k数据集及10k训练集），将28*28的矩阵变成一维的向量，使用全连接网络模型,进行训练(神经元的多少可以调节来寻找更优),采用梯度下降来优化参数。

完成模型的训练后，要进行预测准确率的计算。将训练集中的图片feature作为特征值输入目标函数，得到预测的结果。然后将预测的结果与训练集中图片feature对应的真实结果进行比较，计算预测的准确率。每输入一张图片的features，都会得到10个分类器的值，而这10个分类器中拥有最高值的，其对应的数字便是图片中的数字，因为只有在对应分类器中才能得到较高的评分。

将60k组数据组成的训练集循环训练30次得出模型，并通过10k的测试集计算出准确率，最后读入一张图像通过训练好的模型预测出值来。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120201325581.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ2MzYzNzkw,size_16,color_FFFFFF,t_70#pic_center)
预测后的截图，
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120201434452.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ2MzYzNzkw,size_16,color_FFFFFF,t_70#pic_center)
我在本次深度学习中的收获及心得：
1. 了解了手写数字识别的原理及实现的全过程
2. 了解神经网络的相关要点，和学会了向量化！
3. 学会通过python读入图像、转换为灰度图像并将28*28的图像转化为长度784的向量来方便全连接神经网络模型的训练。
4. 通过语句y = tf.one_hot(y, depth=10)将原先的（label）y转换为独热编码（0-9），是为了方便之后预测0~9的概率，并选出最大概率的值作为预测值
5. 可以通过调参来优化准确率 （例如神经元的个数，学习率的大小，循环训练的次数等）
6. 通过配置环境，了解了tensorflow2.0只能匹配window系统的3.5-3.7版本，并熟悉了python其他包在命令行及pycharm下的install。

## 附录（源代码）

```cpp
import  os
import  tensorflow as tf
from    tensorflow import keras
from    tensorflow.keras import layers, optimizers, datasets
import numpy as np
# import matplotlib.image as mpig
# from PIL import Image

os.environ['TF_CPP_MIN_LOG_LEVEL']='2'

def load_minist_data(path='mnist.npz'):
  """Loads the MNIST dataset.

  Arguments:
      path: path where to cache the dataset locally
          (relative to ~/.keras/datasets).

  Returns:
      Tuple of Numpy arrays: `(x_train, y_train), (x_test, y_test)`.

  License:
      Yann LeCun and Corinna Cortes hold the copyright of MNIST dataset,
      which is a derivative work from original NIST datasets.
      MNIST dataset is made available under the terms of the
      [Creative Commons Attribution-Share Alike 3.0 license.](
      https://creativecommons.org/licenses/by-sa/3.0/)
  """

  path = "E:/A-U/junior/deep learning/exp2/mnist.npz"
  with np.load(path) as f:
    x_train, y_train = f['x_train'], f['y_train']
    x_test, y_test = f['x_test'], f['y_test']

    return (x_train, y_train), (x_test, y_test)

#Load MNIST DATA from file "mnist.npz" , please add your code bellow:
(x, y), (x_val, y_val) = load_minist_data()
#Convert data to tensor, and then make normalization for hand writing digit 
x = tf.convert_to_tensor(x, dtype=tf.float32) / 255. 
#Convert data to tensor, please add your code bellow:
y = tf.convert_to_tensor(y, dtype=tf.int32)
#Here, y is a int value, please transfer it to one hot coding with "depth=10" using tesorflow command
#, please add your code bellow:
y = tf.one_hot(y,depth=10)
print(x.shape, y.shape)
train_dataset = tf.data.Dataset.from_tensor_slices((x, y))
#Please set the batch size, for instance 100 or 200, please add your code bellow:
train_dataset = train_dataset.batch(100)

#请按照上面train_dataset的数据准备方法（tf.data.Dataset.from_tensor_slices),准备test_dataset,
#Please add your code bellow:
test_dataset = tf.data.Dataset.from_tensor_slices((x_val, y_val))

test_dataset = train_dataset.batch(200)

 

#Bellow is defination of hidden-layer in network, you have the chice to make dicision about the number 
# of neurons, the activation is 'relu', please add your code bellow:

model = keras.Sequential([

    layers.Dense(layers.Dense(64, activation='relu')),
    layers.Dense(layers.Dense(64, activation='relu')),
    layers.Dense(10, activation='softmax')])


optimizer = optimizers.SGD(learning_rate=0.001)


def train_epoch(epoch):

    # Step4.loop
    for step, (x, y) in enumerate(train_dataset):


        with tf.GradientTape() as tape:
            # [b, 28, 28] => [b, 784]
            x = tf.reshape(x, (-1, 28*28))
            # Step1. compute output
            # [b, 784] => [b, 10]
            out = model(x)
            # Step2. compute loss
            loss = tf.reduce_sum(tf.square(out - y)) / x.shape[0]

        # Step3. optimize and update w1, w2, w3, b1, b2, b3
        grads = tape.gradient(loss, model.trainable_variables)
        # w' = w - lr * grad
        optimizer.apply_gradients(zip(grads, model.trainable_variables))

        if step % 100 == 0:
            print(epoch, step, 'loss:', loss.numpy())

        # 画模型的训练误差曲线
        # plt.figure()
        # x = [i * 80 for i in range(len(losses))]
        # plt.plot(x, losses, color='C0', marker='s', label='训练')
        # plt.xlabel('Step')
        # plt.ylabel('MSE')
        # plt.legend()
        # plt.savefig('train.svg')

#在训练完成后，请利用已经得到的model验证在测试集上的结果，请仿照上面training_epoch的在下面写出你的具体测试代码
#并输出测试结果（预测值，groud truth），注意只是测试不需要计算loss和计算梯度
def test():
    sum = 0
    for step, (x_val, y_val) in enumerate(test_dataset):
        x_val = tf.reshape(x_val, (-1, 28 * 28))
        out = model(x_val)
        pre = tf.argmax(out, 1)
        tru = tf.argmax(y_val)
        print("预测值:{0}".format(pre), "真实值:{0}".format(tru))
        if pre == tru:
            sum += 1

    # print(sum,   "---",   step)
    print("正确率:%.2f" % (100 * sum / (step + 1)) + '%')


def train():

    for epoch in range(20):

        train_epoch(epoch)
#30个epoch之后调用test_epoch,
    test()  #用测试集来测试一下模型的性能。

#如果你学有余力，请利用我们给的hand writing digit image测试用例，试一试你训练的model（选做）
#注意你需要利用Python先读入test.jpg图像，然后把它转换为灰度图像，然后将图像由28*28转化为784长度的向量，
#然后送入模型，最后输出判别结果。
# def test_img():
    # m = Image.open('test.png').convert('L')
    # im = np.array(m)
    # im[im<=0.5] = 0
    # im[im>0.5] = 1
    # img = tf.convert_to_tensor(im, dtype=tf.float32) / 255
    # img = tf.reshape(img, (-1, 28*28))
    # out = model(img)
    # pre = tf.argmax(out, 1)
    # print("预测值：{0}".format(pre))
if __name__ == '__main__':
    train()
    # test_img()
```
