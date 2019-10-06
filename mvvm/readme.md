# Vue MVVM 的简单实现

**步骤**

1. 数据劫持
   * 使用Object.defineProperty方法重写数据的set和get方法；
   * 数据的get方法注入依赖收集器；
   * set方法观察数据变更；
2. 数据如何渲染到Dom中（简单模拟）
   * 用正则简单模拟节点中符合vue数据的取值；
3. 发布订阅，观察数据是否改变
   * 主要在数据的set方法添加观察方法；
4. 将data挂载到this实例上
   * 依旧使用Object.defineProperty方法将data上的数据复制到vue实例上；
