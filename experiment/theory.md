### **Introduction**

The k-nearest neighbors algorithm, commonly referred to as KNN or k-NN, represents a non-parametric supervised learning classifier. This approach relies on proximity to categorize or forecast the affiliation of a specific data point. Its fundamental premise revolves around the idea that closely situated points tend to exhibit similarities, forming the basis for its decision-making process. It is also called a lazy learner algorithm because it does not learn from the training set immediately; instead, it stores the dataset, and at the time of classification, it performs an action on the dataset.

### **Why do we need K-NN algorithm?**
 It is primarily used for its simplicity and ease of implementation. The algorithm does not require any assumptions about the underlying data distribution. Additionally, it can handle both numerical and categorical data, making it a flexible choice for various types of datasets in classification and regression tasks. K-NN is a non-parametric method that makes predictions based on the similarity of data points in a given dataset. Furthermore, K-NN is less sensitive to outliers compared to other algorithms.<br>
The K-NN algorithm works by finding the K nearest neighbors to a given data point based on a distance metric, such as Euclidean distance. The class or value of the data point is then determined by the majority vote or average of the K neighbors. This approach allows the algorithm to adapt to different patterns and make predictions based on the local structure of the data.<br>
For example, let's consider two categories, namely Category A and Category B. Now, suppose we have a new data point, x1. The question arises: in which of these categories does this data point belong? To address such problems, we rely on the K-NN algorithm. With the assistance of K-NN, we can effortlessly determine the category or class of a specific dataset. Consider the below diagram:

<center>  
<img style="mix-blend-mode: darken;" src="images\why.png" alt="K-NN Algorithm working visualization">
<figcaption><strong>Fig. 1 K-NN Algorithm working visualization</strong></figcaption>
</center>

#### **Distance Metrics Used in K-NN Algorithm:**
1. <b>Euclidean Distance:</b> Euclidean distance can be visualized as the length of the straight line that joins the two points which are into consideration. This metric helps us calculate the net displacement done between the two states of an object.<br>
<center><b>d = √((X2 - X1)² + (Y2 - Y1)²)</b></center>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Where,<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;“d” is the Euclidean distance,<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"X<sub>i</sub>" is the x axis of data point,<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Y<sub>i</sub>" is the y axis of Data point<br><br>

2. <b>Manhattan Distance:</b> It is a distance metric between two points in an N-dimensional vector space. It is defined as the sum of absolute distance between coordinates in corresponding dimensions. If two points are in the form (X1, Y1) and (X2 , Y2). Then,
<center><b>Manhattan distance = |X1 – X2| + |Y1 – Y2|</b></center>
<br>

3. <b>Minkowski Distance:</b> This distance measure is the generalized form of Euclidean and Manhattan distance metrics. It is used for distance similarity of vector. The parameter, p, in the formula below, allows for the creation of other distance metrics. Euclidean distance is represented by this formula when p is equal to two, and Manhattan distance is denoted with p equal to one.

<center><b>Minkowski Distance = ( |X1 – Y1|<sup>p</sup> + |X2 – Y2|<sup>p</sup> )<sup>1/p</sup></b></center>
<br>

#### **How to choose the value of k for K-NN Algorithm?**
The value of k in the k-NN algorithm should be chosen based on the input data. If the input data has more outliers or noise, a higher value of k would be better. It is recommended to choose an odd value for k to avoid ties in classification. Cross-validation methods can help in selecting the best k value for the given dataset.

#### **The k-NN algorithm works as follows:**
1. Initialize value of K.
2. Calculate distance between testing data and training dataset.
3. Sort the distances.
4. Take top K- nearest neighbors.
5. Apply simple majority.
6. Predict class label with more neighbors for testing data.

<center>  
<img style="mix-blend-mode: darken;" src="images\k-NN.png" width="50%" alt="Flowchart for a basic understanding of how K-NN works">
<figcaption><strong>Fig. 2 Flowchart for a basic understanding of how K-NN works</strong></figcaption>
</center>

### **What is the difference between K-NN, and K means?**
K-NN and K-means are two distinct algorithms used in different types of machine learning tasks, and they serve different purposes:

<table>
<caption><strong>Table 1: K-NN vs K-means</strong></caption>
  <tr>
    <th>Feature</th>
    <th>K-NN</th>
    <th>K-means</th>
  </tr>

  <tr>
    <td>K</td>
    <td>The number of nearest neighbors.</td>
    <td>The number of clusters.</td>
  </tr>

  <tr>
    <td>Type</td>
    <td>Supervised learning algorithm</td>
    <td>Unsupervised learning algorithm</td>
  </tr>

  <tr>
    <td>Purpose</td>
    <td>Classification and regression tasks</td>
    <td>Clustering tasks</td>
  </tr>

  <tr>
    <td>Operation</td>
    <td>Predicts based on majority vote or average</td>
    <td>Clusters data based on centroids</td>
  </tr>

  <tr>
    <td>Learning Approach</td>
    <td>Lazy learner (no explicit model creation)</td>
    <td>Eager learner (creates clusters)</td>
  </tr>

  <tr>
    <td>Training Phase</td>
    <td>Stores the entire training dataset</td>
    <td>Builds clusters during training</td>
  </tr>

  <tr>
    <td>Decision Mechanism</td>
    <td>Majority vote or average of k neighbors</td>
    <td>Minimizes squared distances to centroids</td>
  </tr>

  <tr>
    <td>Use Case Examples</td>
    <td>Image recognition, recommendation systems</td>
    <td>Customer segmentation, anomaly detection</td>
  </tr>
</table>


### **Some Applications of K-NN:**

* <b>Image and Pattern Recognition:</b> KNN can be used for image recognition and pattern matching tasks, where it classifies images based on the similarity of their features to those in the training set.
* <b>Recommendation Systems:</b> KNN is employed in collaborative filtering for recommendation systems. It recommends items to users based on the preferences and behavior of users with similar tastes.
* <b>Natural Language Processing (NLP):</b> KNN can be applied in NLP tasks, such as text classification and sentiment analysis, by comparing the textual features of documents or sentences.

### **Advantages**
* <b>Simplicity and Ease of Implementation:</b> KNN is a straightforward algorithm that is easy to understand and implement.
* <b>Versatile:</b> KNN can be applied to both classification and regression problems. Whether you're dealing with categorical or numerical data, KNN can adapt to different types of problems.
* <b>No Training Phase:</b> KNN is a lazy learner algorithm, meaning it doesn't have an explicit training phase. It stores the entire dataset and makes decisions at the time of prediction.
* <b>Few Hyperparameters:</b> The only parameters which are required in the training of a KNN algorithm are the value of k and the choice of the distance metric which we would like to choose from our evaluation metric.


### **Disadvantages**

* Always needs to determine the value of K which may be complex some time.
* The computation cost is high because of calculating the distance between the data points for all the training samples.
* <b>Curse of Dimensionality:</b> It is affected by the curse of dimensionality which implies the algorithm faces a hard time classifying the data points properly when the dimensionality is too high.
* <b>Prone to overfitting:</b> Due to the “curse of dimensionality”, KNN is also more prone to overfitting. While feature selection and dimensionality reduction techniques are leveraged to prevent this from occurring, the value of k can also impact the model’s behavior. Lower values of k can overfit the data, whereas higher values of k tend to “smooth out” the prediction values since it is averaging the values over a greater area, or neighborhood. However, if the value of k is too high, then it can underfit the data.
* <b>Inefficient for Large Datasets:</b> The algorithm's computational inefficiency becomes more pronounced with larger datasets, making it less suitable for scenarios where quick predictions are essential.
* <b>Memory Usage:</b> Since KNN stores the entire dataset during the prediction phase, it can be memory-intensive, particularly with large datasets.




