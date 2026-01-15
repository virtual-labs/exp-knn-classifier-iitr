#### **Introduction**

The k-nearest neighbors algorithm, commonly referred to as KNN or k-NN, represents a non-parametric supervised learning classifier. This approach relies on proximity to categorize or forecast the affiliation of a specific data point. Its fundamental premise revolves around the idea that closely situated points tend to exhibit similarities, forming the basis for its decision-making process. It is also called a lazy learner algorithm because it does not learn from the training set immediately; instead, it stores the dataset, and at the time of classification, it performs an action on the dataset.

#### **Why do we need K-NN algorithm?**
 It is primarily used for its simplicity and ease of implementation. The algorithm does not require any assumptions about the underlying data distribution. Additionally, it can handle both numerical and categorical data, making it a flexible choice for various types of datasets in classification and regression tasks. K-NN is a non-parametric method that makes predictions based on the similarity of data points in a given dataset. Furthermore, K-NN is less sensitive to outliers compared to other algorithms.<br>
The K-NN algorithm works by finding the K nearest neighbors to a given data point based on a distance metric, such as Euclidean distance. The class or value of the data point is then determined by the majority vote or average of the K neighbors. This approach allows the algorithm to adapt to different patterns and make predictions based on the local structure of the data.<br>
For example, let's consider two categories, namely Category A and Category B. Now, suppose we have a new data point, x1. The question arises: in which of these categories does this data point belong? To address such problems, we rely on the K-NN algorithm. With the assistance of K-NN, we can effortlessly determine the category or class of a specific dataset. Consider the below diagram:

<center>  
<img style="mix-blend-mode: darken;" src="images\why.png" alt="K-NN Algorithm working visualization">
<figcaption><strong>Fig. 1 K-NN Algorithm working visualization</strong></figcaption>
</center>

#### **Distance Metrics Used in K-NN Algorithm:**
1. <b>Euclidean Distance:</b> Euclidean distance can be visualized as the length of the straight line that joins the two points which are into consideration. This metric helps us calculate the net displacement done between the two states of an object.<br>
<center><b>d = √ ((X2 - X1)² + (Y2 - Y1)²)</b></center>
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
<img style="mix-blend-mode: darken;" src="images\k-NN.png" width="400" alt="Flowchart for a basic understanding of how K-NN works">
<figcaption><strong>Fig. 2 Flowchart for a basic understanding of how K-NN works</strong></figcaption>
</center>

#### **EXAMPLE**
<b>Problem Statement:</b> Consider a training dataset given in below table. Use K-NN Supervised Learning Algorithm to determeine the class for test instance (7.6, 60, 8).


<!-- <center>  
<img style="mix-blend-mode: darken;" src="images\Ex-8.11.jpg" width="400" alt="Training Dataset T">
<figcaption><strong>Table 1: Training Dataset T</strong></figcaption>
</center> -->

<!-- <div align="center">

<b>Table 1: Training Dataset T</b>

| SNo. | CGPA | Assessment | Project Submitted | Result |
|:---:|:---:|:---:|:---:|:---:|
| 1 | 9.2 | 85 | 8 | Pass |
| 2 | 8.0 | 80 | 7 | Pass |
| 3 | 8.5 | 81 | 8 | Pass |
| 4 | 6.0 | 45 | 5 | Fail |
| 5 | 6.5 | 50 | 4 | Fail |
| 6 | 8.2 | 72 | 7 | Pass |
| 7 | 5.8 | 38 | 5 | Fail |
| 8 | 8.9 | 91 | 9 | Pass |

</div> -->

<table align="center" border="1" cellpadding="6" cellspacing="0">
  <caption><b>Table 1: Training Dataset T</b></caption>
  <tr>
    <th>SNo.</th>
    <th>CGPA</th>
    <th>Assessment</th>
    <th>Project Submitted</th>
    <th>Result</th>
  </tr>
  <tr><td>1</td><td>9.2</td><td>85</td><td>8</td><td>Pass</td></tr>
  <tr><td>2</td><td>8.0</td><td>80</td><td>7</td><td>Pass</td></tr>
  <tr><td>3</td><td>8.5</td><td>81</td><td>8</td><td>Pass</td></tr>
  <tr><td>4</td><td>6.0</td><td>45</td><td>5</td><td>Fail</td></tr>
  <tr><td>5</td><td>6.5</td><td>50</td><td>4</td><td>Fail</td></tr>
  <tr><td>6</td><td>8.2</td><td>72</td><td>7</td><td>Pass</td></tr>
  <tr><td>7</td><td>5.8</td><td>38</td><td>5</td><td>Fail</td></tr>
  <tr><td>8</td><td>8.9</td><td>91</td><td>9</td><td>Pass</td></tr>
</table>


<!-- <div style= "margin-left: 180px;">
<caption><b>Table 1: Training Dataset T</b></caption>
<table style="text-align:center; border: 1px solid black; ">
    <thead>
        <tr style="background-color:#7fc3e1;" >
            <th>S.No.</th>
            <th>CGPA</th>
            <th>Assessment</th>
            <th>Project Submitted</th>
            <th>Result</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1</td>
            <td>9.2</td>
            <td>85</td>
            <td>8</td>
            <td>Pass</td>
        </tr>
        <tr>
            <td>2</td>
            <td>8.0</td>
            <td>80</td>
            <td>7</td>
            <td>Pass</td>
        </tr>
        <tr>
            <td>3</td>
            <td>8.5</td>
            <td>81</td>
            <td>8</td>
            <td>Pass</td>
        </tr>
        <tr>
            <td>4</td>
            <td>6.0</td>
            <td>45</td>
            <td>5</td>
            <td>Fail</td>
        </tr>
        <tr>
            <td>5</td>
            <td>6.5</td>
            <td>50</td>
            <td>4</td>
            <td>Fail</td>
        </tr>
        <tr>
            <td>6</td>
            <td>8.2</td>
            <td>72</td>
            <td>7</td>
            <td>Pass</td>
        </tr>
        <tr>
            <td>7</td>
            <td>5.8</td>
            <td>38</td>
            <td>5</td>
            <td>Fail</td>
        </tr>
        <tr>
            <td>8</td>
            <td>8.9</td>
            <td>91</td>
            <td>9</td>
            <td>Pass</td>
        </tr>
    </tbody>
</table>
</div> -->
<!-- </center> -->
<b>Solution:</b><br>
<b>Step 1:</b> Input Training and Test Data<br>
 Given a test instance(6.1, 40, 5) and a set of categories{'Pass', 'Fail'} also calles a classes, we need to use the traning set to classify the test instance using Euclidean distance.<br>
<b>Step 2:</b> Choose the value of k<br>
Assign k = 3.<br>
<b>Step 3:</b> Calculate the Euclidean distance between the test instance (6.1, 40, 5) and each of the training instances as shown in Table 2.<br>

<!-- <caption><center><b>Table 2: Euclidean Distance</b></center></caption>
<table style="margin: auto; text-align:center; border: 1px solid black; ">
    <thead >
        <tr style="background-color:#7fc3e1;" >
            <th>S.No</th>
            <th>CGPA</th>
            <th>Assessment</th>
            <th>Project Submitted</th>
            <th>Result</th>
            <th>Euclidean Distance</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1</td>
            <td>9.2</td>
            <td>85</td>
            <td>8</td>
            <td>Pass</td>
            <td>√ ((9.2 − 6.1)<sup>2</sup> + (85 − 40)<sup>2</sup> + (8 − 5)<sup>2</sup>)<br>
            = 45.2063</td>
        </tr>
        <tr>
            <td>2</td>
            <td>8.0</td>
            <td>80</td>
            <td>7</td>
            <td>Pass</td>
            <td>√ ((8.0 − 6.1)<sup>2</sup> + (80 − 40)<sup>2</sup> + (7 − 5)<sup>2</sup>)<br> = 40.0950
        </td>
        </tr>
        <tr>
            <td>3</td>
            <td>8.5</td>
            <td>81</td>
            <td>8</td>
            <td>Pass</td>
            <td>√ ((8.5 − 6.1)<sup>2</sup> + (81 − 40)<sup>2</sup> + (8 − 5)<sup>2</sup>)<br> = 41.1796
        </td>
        </tr>
        <tr>
            <td>4</td>
            <td>6.0</td>
            <td>45</td>
            <td>5</td>
            <td>Fail</td>
            <td>√ ((6.0 − 6.1)<sup>2</sup> + (45 − 40)<sup>2</sup> + (5 − 5)<sup>2</sup>)<br> = 5.001
        </td>
        </tr>
        <tr>
            <td>5</td>
            <td>6.5</td>
            <td>50</td>
            <td>4</td>
            <td>Fail</td>
            <td>√ ((6.5 − 6.1)<sup>2</sup> + (50 − 40)<sup>2</sup> + (4 − 5)<sup>2</sup>)<br> = 10.0578
        </td>
        </tr>
        <tr>
            <td>6</td>
            <td>8.2</td>
            <td>72</td>
            <td>7</td>
            <td>Pass</td>
            <td>√ ((8.2 − 6.1)<sup>2</sup> + (72 − 40)<sup>2</sup> + (7 − 5)<sup>2</sup>)<br> = 32.1311
        </td>
        </tr>
        <tr>
            <td>7</td>
            <td>5.8</td>
            <td>38</td>
            <td>5</td>
            <td>Fail</td>
            <td>√ ((5.8 − 6.1)<sup>2</sup> + (38 − 40)<sup>2</sup> + (5 − 5)<sup>2</sup>)<br> = 2.0223
        </td>
        </tr>
        <tr>
            <td>8</td>
            <td>8.9</td>
            <td>91</td>
            <td>9</td>
            <td>Pass</td>
            <td>√ ((8.9 − 6.1)<sup>2</sup> + (91 − 40)<sup>2</sup> + (9 − 5)<sup>2</sup>)<br> = 51.2332
        </td>
        </tr>
    </tbody>
</table>
</center><br> -->
<div align="center">

<b>Table 2: Euclidean Distance</b>

| SNo. | CGPA | Assessment | Project Submitted | Result | Euclidean Distance |
|:---:|:---:|:---:|:---:|:---:|:---:|
| 1 | 9.2 | 85 | 8 | Pass | 45.2063 |
| 2 | 8.0 | 80 | 7 | Pass | 40.0950 |
| 3 | 8.5 | 81 | 8 | Pass | 41.1796 |
| 4 | 6.0 | 45 | 5 | Fail | 5.0010 |
| 5 | 6.5 | 50 | 4 | Fail | 10.0578 |
| 6 | 8.2 | 72 | 7 | Pass | 32.1311 |
| 7 | 5.8 | 38 | 5 | Fail | 2.0223 |
| 8 | 8.9 | 91 | 9 | Pass | 51.2332 |

</div>

<b>Step 4:</b> Identify K Nearest Training Data Points
Sort the distances in the ascending order and select the first 3 nearest training data instances to the test instance. The selected nearest neighbours are shown in below Table 3.<br><br>

<div align="center">

<b>Table 3: Nearest Neighbours</b>

| Instance | Euclidean Distance | Class |
|:---:|:---:|:---:|
| 4 | 5.001 | Fail |
| 5 | 10.0578 | Fail |
| 7 | 2.0223 | Fail |

</div>

<!-- <caption><center><b>Table 3: Nearest Neighbours</b></center></caption>
<table style="margin: auto; text-align:center; border: 1px solid black; ">
    <tr style="background-color:#7fc3e1;">
        <th><font color="Black">Instance</font></th>
        <th><font color="Black">Euclidean Distance</font></th>
        <th><font color="Black">Class</font></th>
    </tr>
    <tr>
        <td align="center">4</td>
        <td align="center">5.001</td>
        <td align="center">Fail</td>
    </tr>
    <tr>
        <td align="center">5</td>
        <td align="center">10.05783</td>
        <td align="center">Fail</td>
    </tr>
    <tr>
        <td align="center">7</td>
        <td align="center">2.022375</td>
        <td align="center">Fail</td>
    </tr>
</table>
</center><br> -->

<b>Step 5: </b>Predict the class of the test instances 4,5 and 7 with smallest distances.<br>
<b>Step 6: </b>The class for the test instance is predicted as <font color="red">'Fail'</font>.



#### **What is the difference between K-NN, and K means?**
K-NN and K-means are two distinct algorithms used in different types of machine learning tasks, and they serve different purposes:

<div align="center">

<b>Table 4: K-NN vs K-means</b>

| Feature | K-NN | K-means |
|:---:|:---:|:---:|
| Type | Supervised | Unsupervised |
| Purpose | Classification/Regression | Clustering |
| Learning | Lazy | Eager |
| Use Case | Recommendation, Vision | Segmentation |

</div>

<br>
<!-- <table align="center">
<caption><strong><center>Table 4: K-NN vs K-means</center></strong></caption>
  <tr style="background-color:#7fc3e1;">
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
</table> -->


#### **Some Applications of K-NN:**

* <b>Image and Pattern Recognition:</b> KNN can be used for image recognition and pattern matching tasks, where it classifies images based on the similarity of their features to those in the training set.
* <b>Recommendation Systems:</b> KNN is employed in collaborative filtering for recommendation systems. It recommends items to users based on the preferences and behavior of users with similar tastes.
* <b>Natural Language Processing (NLP):</b> KNN can be applied in NLP tasks, such as text classification and sentiment analysis, by comparing the textual features of documents or sentences.

#### **Advantages**
* <b>Simplicity and Ease of Implementation:</b> KNN is a straightforward algorithm that is easy to understand and implement.
* <b>Versatile:</b> KNN can be applied to both classification and regression problems. Whether you're dealing with categorical or numerical data, KNN can adapt to different types of problems.
* <b>No Training Phase:</b> KNN is a lazy learner algorithm, meaning it doesn't have an explicit training phase. It stores the entire dataset and makes decisions at the time of prediction.
* <b>Few Hyperparameters:</b> The only parameters which are required in the training of a KNN algorithm are the value of k and the choice of the distance metric which we would like to choose from our evaluation metric.


#### **Disadvantages**

* Always needs to determine the value of K which may be complex some time.
* The computation cost is high because of calculating the distance between the data points for all the training samples.
* <b>Curse of Dimensionality:</b> It is affected by the curse of dimensionality which implies the algorithm faces a hard time classifying the data points properly when the dimensionality is too high.
* <b>Prone to overfitting:</b> Due to the “curse of dimensionality”, KNN is also more prone to overfitting. While feature selection and dimensionality reduction techniques are leveraged to prevent this from occurring, the value of k can also impact the model’s behavior. Lower values of k can overfit the data, whereas higher values of k tend to “smooth out” the prediction values since it is averaging the values over a greater area, or neighborhood. However, if the value of k is too high, then it can underfit the data.
* <b>Inefficient for Large Datasets:</b> The algorithm's computational inefficiency becomes more pronounced with larger datasets, making it less suitable for scenarios where quick predictions are essential.
* <b>Memory Usage:</b> Since KNN stores the entire dataset during the prediction phase, it can be memory-intensive, particularly with large datasets.




