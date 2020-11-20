## sentiment_analysis_layer_LSTM
> 2020-9-10 13:27:19 
<br>分类专栏：深度学习 神经网络 LSTM 


我们来利用基础的 RNN 网络来挑战情感分类问题。RNN 网络共 2 层，循环提取序列信号的语义特征，利用第 2 层 RNN 层的最后时间戳的状态向量作为句子的特征表示，送入全连接层构成的分类网络 3，得到样本为积极情感的概率P(x 为积极情感| ) ∈ [0,1]。

> IMDB 影评数据集包含了 50,000 条用户评价，评价的标签分为消极和积极， 其中IMDB 评级<5 的用户评价标注为 0，即消极； IMDB 评价>=7 的用户评价标注为 1，即积极。 25,000 条影评用于训练集， 25,000 条用于测试集。可以通过keras.datasets直接加载。

一个序列（句子）在每个时间戳上面产生的是一个单词或字符。如果希望神经网络能够用于自然语言处理任务，那么怎么把单词或字符转化为向量就尤为关键。在神经网络中，单词的表示向量可以直接通过训练的方式得到，我们把单词的表示层叫做 Embedding 层。 Embedding 层负责把单词编码为某个向量 ，他接受的是采用数字编码的单词 ，如 2 表示“ I”， 3 表示“ me” 等， 系统总单词数量记为 _ ， 输出长度为f的向量 。在 TensorFlow 中，可以通过 layers.Embedding( _ , )来定义一 Word Embedding层，其中 _ 参数指定词汇数量， 指定单词向量的长度。

  在每个时间戳，网络层接受当前时间戳的输入  和上一个时间戳的网络状态向量  ，经过  运算后得到当前时间戳的新状态向量  ,并写入内存状态中。在每个时间戳上，网络层均有输出产生  ，即将网络的状态向量变换后输出。

长短期记忆单元是你可以放置在神经中枢的模块。在较高的层次上，它们确保隐藏状态向量h能够在文本中封装关于长期依赖关系的信息。在 LSTM 中，有两个状态向量c和h， 其中c作为 LSTM 的内部状态向量，可以理解为LSTM 的内存 Memory，而h表示 LSTM 的输出向量，相对于基础的 RNN 来说， LSTM 把内部 Memory 和输出分开为 2 个变量，同时利用三个门控：输入门(Input Gate)， 遗忘门(Forget Gate)和输出门(Output Gate)来控制内部信息的流动。
![遗忘门](https://img-blog.csdnimg.cn/2020112019541831.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ2MzYzNzkw,size_16,color_FFFFFF,t_70#pic_center)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120195455238.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ2MzYzNzkw,size_16,color_FFFFFF,t_70#pic_center)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120195509859.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ2MzYzNzkw,size_16,color_FFFFFF,t_70#pic_center)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120195521348.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ2MzYzNzkw,size_16,color_FFFFFF,t_70#pic_center)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120195621497.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ2MzYzNzkw,size_16,color_FFFFFF,t_70#pic_center)
用来测试的数据是一段阿甘正传的影评 ，

> Forrest Gump, the movie which I have watched for three times, is a film that surprised and moved me so much .It was based on the novel of Winston Groom while the hero is a famous actor—Tom Hanks. He performed so well all through the film that I enjoyed the warm human nature, the inspiration of belief and other virtues through any scene in it.

训练及测试的截图如下（因为训练时间有点无法忍受所以只循环训练了20几次）

epoch=10时，
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120194727761.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ2MzYzNzkw,size_16,color_FFFFFF,t_70#pic_center)
epoch=28时，
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120194846782.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ2MzYzNzkw,size_16,color_FFFFFF,t_70#pic_center)
将一维数组转化为二维满足IMDB格式的词数字编码后再预测
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120194905845.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ2MzYzNzkw,size_16,color_FFFFFF,t_70#pic_center)
测试出影评为正向好评的概率是0.73，差评概率为0.27，训练的模型还算可以但是因为训练的次数还是太少，所以效果不是太理想。

## 了解更多：
相对于基本RNN网络只有一个状态向量  ，LSTM 新增了一个状态向量  ，同时引入了门控(Gate)机制， 通过门控来控制信息的遗忘和刷新。

 LSTM的变种-GRU
LSTM 具有更长的记忆能力， 在大部分序列任务上面都取得了比基础的 RNN 模型更好的性能表现，更重要的是， LSTM 不容易出现梯度弥散现象。 但是 LSTM 相对较复杂， 计算代价较高，模型参数量较大。 于是科学家们尝试简化 LSTM 内部的计算流程， 特别是减少门控数量。 研究发现， 遗忘门是 LSTM 中最重要的门控 (Westhuizen & Lasenby, 2018)，甚至发现只有遗忘门的简化版网络在多个基准数据集上面优于标准 LSTM 网络。 在众多的简化版 LSTM 中，门控循环网络(Gated Recurrent Unit)是应用最广泛的变种之一。 GRU 把内部状态向量和输出向量合并，统一为状态向量 ， 门控数量也减少到 2 个：复位门(ResetGate)和更新门(Update Gate)。
## 附录（源代码）
带有测试及对感情词汇频率的排序

```cpp
import  os
import sys
import re,string
import  tensorflow as tf
import  numpy as np
from    tensorflow import keras
from    tensorflow.keras import layers, losses, optimizers, Sequential

os.environ['TF_CPP_MIN_LOG_LEVEL']='2'
os.environ["CUDA_VISIBLE_DEVICES"]='0'
print("This code run on the GPU ID:", os.environ['CUDA_VISIBLE_DEVICES'])

# gpus = tf.config.experimental.list_physical_devices(device_type='GPU')
# gpus = tf.config.experimental.list_physical_devices(device_type=None)
# for gpu in gpus:
#     tf.config.experimental.set_memory_growth(gpu, True)

# assert tf.__version__.startswith('2.')

tf.random.set_seed(22)
np.random.seed(22)

batchsz = 128 # 批量大小
total_words = 10000 # 词汇表大小N_vocab（词汇表中的词是按照词使用的频率由小到大排列的，这里之关系前10000个常用词）
max_review_len = 80 # 句子最大长度s，大于的句子部分将截断，小于的将填充
embedding_len = 100 # 词向量特征长度f
# 加载IMDB数据集，此处的数据采用数字编码，一个数字代表一个单词
(x_train, y_train), (x_test, y_test) = keras.datasets.imdb.load_data(num_words=total_words)
# print(x_train.shape, len(x_train[0]), y_train.shape)
# print(x_test.shape, len(x_test[0]), y_test.shape)
#%%输出第一个影评的词向量数字编码
# print("This is the first sample in training data:", x_train[0])
# 利用等待键盘输入的方式暂停一下，让你观察一下text形式的数据
# input()
#%%
# 数字编码表(这是IMDB数据集自带的词编码表)
word_index = keras.datasets.imdb.get_word_index()
#输出词数字编码表
# for k,v in word_index.items():
#      print(k,v)

word_dict = sorted(word_index.items(), key=lambda d:d[1])
for i in word_dict[:1500]:
    print(i[0],i[1])


#%%在IMDB数据预处理的过程中，前4个value：0，1，2，3分别作为padding-0，start-1，unknown-2和unused-3的标记，
#所以要在IMDB原始词编码表的基础上，将value+3后才能得到IMDB data
word_index = {k:(v+3) for k,v in word_index.items()}
word_index["<PAD>"] = 0
word_index["<START>"] = 1
word_index["<UNK>"] = 2  # unknown
word_index["<UNUSED>"] = 3

# 翻转编码表（可以利用它将词向量表转化为自然语言的句子，当然这里面不包含标点符号）
reverse_word_index = dict([(value, key) for (key, value) in word_index.items()])
# 利用翻转编码表将词向量转化为text向量
def decode_review(text):
    return ' '.join([reverse_word_index.get(i, '?') for i in text])
# 利用decode_review()将训练数据x_train[8]转化为text，请阅读输出结果
# print(decode_review(x_train[8]))
# 利用等待键盘输入的方式暂停一下，让你观察一下text形式的数据
# input()
#%%
# x_train:[b, 80]
# x_test: [b, 80]
# 截断和填充句子，使得等长，此处长句子保留句子后面的部分，短句子在前面填充
x_train = keras.preprocessing.sequence.pad_sequences(x_train, maxlen=max_review_len)
x_test = keras.preprocessing.sequence.pad_sequences(x_test, maxlen=max_review_len)
# 构建数据集，打散，批量，并丢掉最后一个不够batchsz的batch
db_train = tf.data.Dataset.from_tensor_slices((x_train, y_train))
db_train = db_train.shuffle(1000).batch(batchsz, drop_remainder=True)
db_test = tf.data.Dataset.from_tensor_slices((x_test, y_test))
db_test = db_test.batch(batchsz, drop_remainder=True)
# print('x_train shape:', x_train.shape, tf.reduce_max(y_train), tf.reduce_min(y_train))
# print('x_test shape:', x_test.shape)

#%%

class MyRNN(keras.Model):
    # Cell方式构建多层网络
    def __init__(self, units):
        super(MyRNN, self).__init__() 
        # 词向量编码 [b, 80] => [b, 80, 100]
        # embedding：单词的表示层 把单词编码为某个向量 ，他接受的是采用数字编码的单词
        self.embedding = layers.Embedding(total_words, embedding_len,  # 指定词汇数量， 指定单词向量的长度
                                          input_length=max_review_len)
        # 构建RNN  长短时记忆网络LSTM
        self.rnn = keras.Sequential([
            layers.LSTM(units, dropout=0.5, return_sequences=True),  #默认只会返回最后一个时间戳的输出 返回每个时间戳上面的输出， 需要设置 return_sequences=True 标志
            layers.LSTM(units, dropout=0.5)
        ])
        # 构建分类网络，用于将CELL的输出特征进行分类，2分类
        # [b, 80, 100] => [b, 64] => [b, 1]
        self.outlayer = Sequential([
        	layers.Dense(32),
        	layers.Dropout(rate=0.5),
        	layers.ReLU(),
        	layers.Dense(1)])

    def call(self, inputs, training=None):
        x = inputs # [b, 80]
        # embedding: [b, 80] => [b, 80, 100]
        x = self.embedding(x)
        # rnn cell compute,[b, 80, 100] => [b, 64]
        x = self.rnn(x)
        # 末层最后一个输出作为分类网络的输入: [b, 64] => [b, 1]
        x = self.outlayer(x,training)
        # p(y is pos|x)
        prob = tf.sigmoid(x)

        return prob

def main():
    units = 64 # RNN状态向量长度f
    epochs = 5 # 训练epochs

    model = MyRNN(units)
    # 装配
    model.compile(optimizer = optimizers.Adam(0.001),
                  loss = losses.BinaryCrossentropy(),
                  metrics=['accuracy'])
    # 训练和验证
    model.fit(db_train, epochs=epochs, validation_data=db_test)
    # 测试
    model.evaluate(db_test)

    vector_list = []
    vector_list.append(1)
    s = open("forrest gump.txt").read()
    punc = '~`!#$%^&*()_+-=|\';":/.,?><~·！@#￥%……&*（）——+-=“：’；、。，？》《{}'
    word_list = re.sub(r"[%s]+" % punc, "", s).split(" ")
    for i in range(len(word_list)):
        if word_list[i] in word_index.keys():
            vector_list.append(word_index[word_list[i]])
        else:
            vector_list.append(2)

    print(vector_list)
    vector_list = np.array(vector_list)
    print(vector_list)
    vector_list = vector_list.reshape((-1, vector_list.shape[0]))

    print(vector_list)
    input()
    vector_list = keras.preprocessing.sequence.pad_sequences(vector_list, maxlen=max_review_len)

    print(vector_list)
    input()
    vector_list = tf.convert_to_tensor(vector_list, dtype=tf.int64)

    print(vector_list)
    input()
    vector_list = tf.reshape(vector_list, (-1, 80))

    print(vector_list)
    input()
    y = model.predict(vector_list) 
    # input()
    n = tf.sigmoid(y).numpy() 
    print("The predict of the film review is %.2f to be positive and %.2f to be negative" % (np.max(n), 1 - np.max(n)))

if __name__ == '__main__':
    main()
```
