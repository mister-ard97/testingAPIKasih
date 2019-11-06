-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: localhost    Database: kasihnusantara
-- ------------------------------------------------------
-- Server version	8.0.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `paymentType` varchar(255) NOT NULL,
  `nominal` int(11) NOT NULL,
  `statusPayment` varchar(255) NOT NULL,
  `projectId` int(11) DEFAULT NULL,
  `scholarshipId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `isRefund` int(11) NOT NULL DEFAULT '0',
  `refundDate` int(11) DEFAULT NULL,
  `isDeleted` int(11) NOT NULL DEFAULT '0',
  `order_id` varchar(255) NOT NULL,
  `komentar` varchar(255) DEFAULT NULL,
  `isAnonim` int(11) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `payments_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (1,'pending',2000000,'pending',1,NULL,2,0,NULL,0,'dev-500','-',0,'2019-10-29 08:18:54','2019-10-29 08:18:54'),(2,'pending',8000000,'pending',1,NULL,2,0,NULL,0,'dev-318','-',0,'2019-10-29 08:19:26','2019-10-29 08:19:26'),(3,'pending',10000000,'pending',2,NULL,2,0,NULL,0,'dev-296','-',0,'2019-10-29 09:05:01','2019-10-29 09:05:01'),(4,'pending',100000,'pending',1,NULL,2,0,NULL,0,'dev-361','-',0,'2019-10-29 09:51:23','2019-10-29 09:51:23'),(5,'pending',900000,'pending',2,NULL,2,0,NULL,0,'dev-668','-',0,'2019-10-29 09:57:03','2019-10-29 09:57:03'),(8,'pending',300000,'pending',0,1,2,0,NULL,0,'dev401','-',0,'2019-10-31 06:25:19','2019-10-31 06:25:19'),(9,'pending',10000,'pending',NULL,1,2,0,NULL,0,'dev810','-',0,'2019-11-01 02:21:06','2019-11-01 02:21:06');
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `projectCreated` datetime NOT NULL,
  `projectEnded` datetime NOT NULL,
  `totalTarget` int(11) NOT NULL,
  `projectImage` varchar(255) NOT NULL,
  `shareDescription` varchar(255) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `isCancelled` int(11) NOT NULL DEFAULT '0',
  `cancelledDate` datetime DEFAULT NULL,
  `isGoing` int(11) DEFAULT '1',
  `isDeleted` int(11) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `projects_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (1,'Project 1','<p><strong>Project 1</strong></p><p><strong>Donasi ke project 1</strong></p>','2019-10-25 00:00:00','2019-10-31 00:00:00',10000000,'/post/image/project/PJT1573024649971.jpg','Ayo Donasi',2,0,NULL,1,0,'2019-10-24 03:13:27','2019-11-06 07:17:29'),(2,'Project 2 Murid 2','<p>Project 2</p><p>Donasi ke Project 2</p>','2019-10-26 00:00:00','2019-10-30 00:00:00',20000000,'/post/image/project/PJT1573024662376.jpg','Donasi 2 ayo bantu',2,0,NULL,1,0,'2019-10-24 03:15:20','2019-11-06 07:17:42');
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scholarships`
--

DROP TABLE IF EXISTS `scholarships`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `scholarships` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `judul` varchar(45) NOT NULL,
  `studentId` int(11) NOT NULL,
  `schoolId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `nominal` bigint(20) NOT NULL,
  `durasi` int(11) NOT NULL,
  `description` text NOT NULL,
  `shareDescription` varchar(241) NOT NULL,
  `scholarshipStart` date NOT NULL,
  `scholarshipEnded` date NOT NULL,
  `isVerified` int(11) NOT NULL DEFAULT '0',
  `isOngoing` int(11) NOT NULL DEFAULT '0',
  `note` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scholarships`
--

LOCK TABLES `scholarships` WRITE;
/*!40000 ALTER TABLE `scholarships` DISABLE KEYS */;
INSERT INTO `scholarships` VALUES (1,'Ringankan biaya bulanan Murid 2',2,1,2,300000,3,'<p>Ringankan Bebab dari Murid 2</p>','Ayo kita sama bantu murid 2.','2019-10-30','2020-01-30',1,1,'Maaf Scholarship ini ditolak','2019-10-30 04:15:13','2019-11-04 04:30:00'),(2,'Ringankan Biaya Murid 1',1,1,2,100000,5,'<p>Halo Dunia Murid 1</p>','Murid 1 Butuh Bantuan nih','2019-11-04','2020-04-04',1,1,'','2019-11-04 04:46:48','2019-11-05 04:22:55'),(3,'Ringankan Biaya bulanan Murid 3',3,2,2,200000,6,'<p>Ayu bantu murid 3 dengan menyisihkan uang yang kalian punya. Karena berapapun nominalnya itu sangat berarti</p>','Ayo kita bantu murid 3 supaya murid 3 dapat bersekolah dengan tenang tanpa harus memikirkan biaya','2019-11-05','2020-05-05',1,1,'','2019-11-05 04:26:10','2019-11-05 04:37:47'),(4,'Ringankan biaya bulanan Murid 2',2,1,2,300000,3,'<p>Ringankan Bebab dari Murid 2</p>','Ayo kita sama bantu murid 2.','2019-10-30','2020-01-30',1,1,'Maaf Scholarship ini ditolak','2019-10-30 04:15:13','2019-11-04 04:30:00'),(5,'Ringankan Biaya Murid 1',1,1,2,100000,5,'<p>Halo Dunia Murid 1</p>','Murid 1 Butuh Bantuan nih','2019-11-04','2020-04-04',1,1,'','2019-11-04 04:46:48','2019-11-05 04:22:55'),(6,'Ringankan Biaya bulanan Murid 3',3,2,2,200000,6,'<p>Ayu bantu murid 3 dengan menyisihkan uang yang kalian punya. Karena berapapun nominalnya itu sangat berarti</p>','Ayo kita bantu murid 3 supaya murid 3 dapat bersekolah dengan tenang tanpa harus memikirkan biaya','2019-11-05','2020-05-05',1,1,'','2019-11-05 04:26:10','2019-11-05 04:37:47'),(7,'Ringankan biaya bulanan Murid 2',2,1,2,300000,3,'<p>Ringankan Bebab dari Murid 2</p>','Ayo kita sama bantu murid 2.','2019-10-30','2020-01-30',1,1,'Maaf Scholarship ini ditolak','2019-10-30 04:15:13','2019-11-04 04:30:00'),(8,'Ringankan Biaya Murid 1',1,1,2,100000,5,'<p>Halo Dunia Murid 1</p>','Murid 1 Butuh Bantuan nih','2019-11-04','2020-04-04',1,1,'','2019-11-04 04:46:48','2019-11-05 04:22:55'),(9,'Ringankan Biaya bulanan Murid 3',3,2,2,200000,6,'<p>Ayu bantu murid 3 dengan menyisihkan uang yang kalian punya. Karena berapapun nominalnya itu sangat berarti</p>','Ayo kita bantu murid 3 supaya murid 3 dapat bersekolah dengan tenang tanpa harus memikirkan biaya','2019-11-05','2020-05-05',1,1,'','2019-11-05 04:26:10','2019-11-05 04:37:47'),(10,'Ringankan biaya bulanan Murid 2',2,1,2,300000,3,'<p>Ringankan Bebab dari Murid 2</p>','Ayo kita sama bantu murid 2.','2019-10-30','2020-01-30',1,1,'Maaf Scholarship ini ditolak','2019-10-30 04:15:13','2019-11-04 04:30:00'),(11,'Ringankan Biaya Murid 1',1,1,2,100000,5,'<p>Halo Dunia Murid 1</p>','Murid 1 Butuh Bantuan nih','2019-11-04','2020-04-04',1,1,'','2019-11-04 04:46:48','2019-11-05 04:22:55'),(12,'Ringankan Biaya bulanan Murid 3',3,2,2,200000,6,'<p>Ayu bantu murid 3 dengan menyisihkan uang yang kalian punya. Karena berapapun nominalnya itu sangat berarti</p>','Ayo kita bantu murid 3 supaya murid 3 dapat bersekolah dengan tenang tanpa harus memikirkan biaya','2019-11-05','2020-05-05',1,1,'','2019-11-05 04:26:10','2019-11-05 04:37:47');
/*!40000 ALTER TABLE `scholarships` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schools`
--

DROP TABLE IF EXISTS `schools`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schools` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nama` varchar(255) NOT NULL,
  `alamat` varchar(255) NOT NULL,
  `telepon` varchar(255) NOT NULL,
  `namaPemilikRekening` varchar(255) NOT NULL,
  `nomorRekening` varchar(255) NOT NULL,
  `bank` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schools`
--

LOCK TABLES `schools` WRITE;
/*!40000 ALTER TABLE `schools` DISABLE KEYS */;
INSERT INTO `schools` VALUES (1,'SD NEGERI 2','BSD','081211112222','SD NEGERI 2','0123456','BCA','2019-10-24 03:13:27','2019-10-24 03:13:27'),(2,'SD NEGERI 5','Tangerang','081233332222','SD NEGERI 5','0123456','BCA','2019-10-26 03:13:27','2019-10-26 03:13:27');
/*!40000 ALTER TABLE `schools` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('20191023083309-create-user.js'),('20191023083318-create-school.js'),('20191023083325-create-student.js'),('20191023083331-create-student-detail.js'),('20191023083801-create-project.js'),('20191023083824-create-payment.js'),('20191023083836-create-student-revision.js'),('20191023083849-create-student-detail-revision.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `studentdetailrevisions`
--

DROP TABLE IF EXISTS `studentdetailrevisions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `studentdetailrevisions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pictureReport` varchar(255) DEFAULT NULL,
  `deskripsi` varchar(255) DEFAULT NULL,
  `class` varchar(45) DEFAULT NULL,
  `studentId` int(11) DEFAULT NULL,
  `detailId` int(11) NOT NULL DEFAULT '0',
  `isDeleted` int(11) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studentdetailrevisions`
--

LOCK TABLES `studentdetailrevisions` WRITE;
/*!40000 ALTER TABLE `studentdetailrevisions` DISABLE KEYS */;
INSERT INTO `studentdetailrevisions` VALUES (30,'/student/images/RPT1572322760036.png','Raport smp kelas 3','3',3,11,0,'2019-10-29 04:20:25','2019-10-29 04:20:25'),(31,'/student/images/RPT1572322825424.png','Raport smp kelas 3','3',3,11,0,'2019-11-05 04:28:09','2019-11-05 04:28:09'),(32,'/student/images/RPT1572319519646.jpg','Raport Kelas 2 SMP','1',3,9,1,'2019-11-05 04:28:26','2019-11-05 04:28:48');
/*!40000 ALTER TABLE `studentdetailrevisions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `studentdetails`
--

DROP TABLE IF EXISTS `studentdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `studentdetails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pictureReport` varchar(255) NOT NULL,
  `deskripsi` varchar(255) NOT NULL,
  `class` varchar(45) NOT NULL,
  `studentId` int(11) DEFAULT NULL,
  `dataStatus` varchar(20) NOT NULL,
  `statusNote` varchar(45) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `studentdetails_ibfk_1` (`studentId`),
  CONSTRAINT `studentdetails_ibfk_1` FOREIGN KEY (`studentId`) REFERENCES `students` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studentdetails`
--

LOCK TABLES `studentdetails` WRITE;
/*!40000 ALTER TABLE `studentdetails` DISABLE KEYS */;
INSERT INTO `studentdetails` VALUES (9,'/student/images/RPT1572928106269.png','Raport Kelas 2 SMP','1',3,'Approved','','2019-10-29 02:49:59','2019-11-05 04:28:48'),(11,'/student/images/RPT1572928089832.png','Raport smp kelas 3','3',3,'Approved',NULL,'2019-10-29 04:19:20','2019-11-05 04:29:17'),(12,'/student/images/RPT1572597621536.jpg','Raport SMA Kelas 1','1',1,'Approved',NULL,'2019-11-01 08:40:21','2019-11-05 04:29:24'),(13,'/student/images/RPT1572928321750.png','Raport Kelas 1 SMA','1',4,'Approved',NULL,'2019-11-05 04:32:01','2019-11-05 04:32:15');
/*!40000 ALTER TABLE `studentdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `studentrevisions`
--

DROP TABLE IF EXISTS `studentrevisions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `studentrevisions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `pendidikanTerakhir` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `alamat` varchar(255) NOT NULL,
  `tanggalLahir` datetime NOT NULL,
  `studentImage` varchar(255) NOT NULL,
  `isDeleted` int(11) NOT NULL DEFAULT '0',
  `userId` int(11) DEFAULT NULL,
  `story` varchar(255) NOT NULL,
  `schoolId` int(11) DEFAULT NULL,
  `studentId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `schoolId` (`schoolId`),
  CONSTRAINT `studentrevisions_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `studentrevisions_ibfk_2` FOREIGN KEY (`schoolId`) REFERENCES `schools` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studentrevisions`
--

LOCK TABLES `studentrevisions` WRITE;
/*!40000 ALTER TABLE `studentrevisions` DISABLE KEYS */;
INSERT INTO `studentrevisions` VALUES (23,'Yuvens','S1','Laki-Laki','yatimpiatu','Tangerang','1110-12-31 17:17:56','/student/images/STD1572320684604.jpg',1,2,'Yuvens Murid',1,5,'2019-10-29 03:45:38','2019-10-29 03:45:50'),(24,'Murid 3','SMP','Laki-Laki','yatim','Tangerang 12356','1998-09-30 17:00:00','/student/images/STD1571993979356.png',1,2,'Murid 3 Tangerang',1,3,'2019-11-01 10:01:19','2019-11-01 10:02:04'),(25,'Murid 1','SD','Laki-Laki','yatim','Tangerang','2019-10-31 17:00:00','/student/images/STD1572602926609.jpg',1,2,'Murid 1',1,1,'2019-11-01 10:13:43','2019-11-01 10:16:19'),(26,'Murid 2','SMP','Laki-Laki','piatu','Tangerang','2019-11-01 17:00:00','/student/images/STD1572602959565.jpg',1,2,'Murid 2',2,2,'2019-11-01 10:14:00','2019-11-01 10:16:27'),(27,'Murid 2','SMK','Laki-Laki','piatu','Tangerang','2019-11-01 17:00:00','/student/images/STD1572602959565.jpg',1,2,'Murid 2',2,2,'2019-11-05 04:17:52','2019-11-05 04:19:30'),(28,'Murid 1','SMP','Laki-Laki','yatim','Tangerang','2019-10-31 17:00:00','/student/images/STD1572602926609.jpg',1,2,'Murid 1',1,1,'2019-11-05 04:18:09','2019-11-05 04:19:39');
/*!40000 ALTER TABLE `studentrevisions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `pendidikanTerakhir` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `alamat` varchar(255) NOT NULL,
  `tanggalLahir` datetime NOT NULL,
  `studentImage` varchar(255) NOT NULL,
  `isDeleted` int(11) NOT NULL DEFAULT '0',
  `userId` int(11) DEFAULT NULL,
  `story` varchar(255) DEFAULT NULL,
  `schoolId` int(11) DEFAULT NULL,
  `dataStatus` varchar(45) NOT NULL,
  `statusNote` varchar(45) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `schoolId` (`schoolId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES (1,'Murid 1','SMP','Laki-Laki','yatim','Tangerang','2007-10-31 17:00:00','/student/images/STD1572927489988.jpg',0,2,'Murid 1',1,'Approved',NULL,'2019-11-01 10:08:46','2019-11-05 04:19:39'),(2,'Murid 2','SMK','Laki-Laki','piatu','Tangerang','2010-11-01 17:00:00','/student/images/STD1572927472439.jpg',0,2,'Murid 2',2,'Approved',NULL,'2019-11-01 10:09:19','2019-11-05 04:19:30'),(3,'Murid 3','SD','Laki-Laki','yatim','Jalan Tangerang','2001-11-03 17:00:00','/student/images/STD1572927460422.JPG',0,2,'Murid 3 adalah siswa sederhana dari Tangerang',2,'Approved',NULL,'2019-11-05 04:17:40','2019-11-05 04:19:48'),(4,'Murid 4','SMA','Laki-Laki','yatimpiatu','Jalan BSD','2019-11-18 17:00:00','/student/images/STD1572927545246.png',0,2,'Murid 4 adalah siswa dari BSD yang sudah ditinggal oleh orang tuanya.',2,'Approved',NULL,'2019-11-05 04:19:05','2019-11-05 04:19:46');
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subscriptions`
--

DROP TABLE IF EXISTS `subscriptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subscriptions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `scholarshipId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `nominalSubscription` int(11) DEFAULT NULL,
  `remainderDate` date DEFAULT NULL,
  `isCancelled` int(11) DEFAULT NULL,
  `cancelledDate` date DEFAULT NULL,
  `monthLeft` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscriptions`
--

LOCK TABLES `subscriptions` WRITE;
/*!40000 ALTER TABLE `subscriptions` DISABLE KEYS */;
INSERT INTO `subscriptions` VALUES (4,1,NULL,100000,'2019-11-30',NULL,NULL,3,'2019-10-30 09:48:25','2019-10-30 09:48:25'),(5,1,NULL,50000,'2019-11-30',NULL,NULL,3,'2019-10-30 09:50:54','2019-10-30 09:50:54'),(6,1,NULL,15000,'2019-11-30',NULL,NULL,3,'2019-10-30 09:51:42','2019-10-30 09:51:42'),(7,1,2,300000,'2019-12-30',NULL,NULL,12,'2019-10-31 06:22:22','2019-10-31 06:22:22'),(8,1,2,300000,'2019-12-30',NULL,NULL,12,'2019-10-31 07:48:15','2019-10-31 07:48:15'),(9,1,NULL,100000,'2019-10-31',NULL,NULL,3,'2019-10-31 08:09:23','2019-10-31 08:09:23');
/*!40000 ALTER TABLE `subscriptions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nama` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `phoneNumber` varchar(255) NOT NULL DEFAULT '-',
  `isGoogle` varchar(255) DEFAULT NULL,
  `isFacebook` varchar(255) DEFAULT NULL,
  `userImage` varchar(255) NOT NULL,
  `lastLogin` datetime NOT NULL,
  `verified` int(11) NOT NULL DEFAULT '0',
  `role` varchar(255) NOT NULL,
  `subscriptionStatus` int(11) NOT NULL DEFAULT '0',
  `subscriptionNominal` int(11) DEFAULT '0',
  `reminderDate` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Reza Ardiansyah',NULL,'rezardiansyah1997@gmail.com','0','651ebf8098f121b6c458ddcc29ac7e839e1f3e292e35b4e990aabdc8ce5ae9ae',NULL,'/defaultPhoto/defaultUser.png','2019-10-24 02:22:53',1,'User',0,0,NULL,'2019-10-24 02:22:53','2019-10-24 02:22:53'),(2,'Yubi Kitta',NULL,'yubikitta@gmail.com','0','f0adf2ad8a08ecb17029e155b66c0413c891b3212ff85dca1f7a773c5841e80a',NULL,'/defaultPhoto/defaultUser.png','2019-10-25 07:50:54',1,'User',0,0,NULL,'2019-10-25 07:50:54','2019-10-25 07:50:54'),(3,'Reza Iansyah',NULL,'rezamusashi@gmail.com','0','7371cba8eb5f16656a977ebd3da7ecbafa753a654162daa34a73917a9563e595',NULL,'/defaultPhoto/defaultUser.png','2019-10-31 06:04:50',1,'User',0,0,NULL,'2019-10-31 06:04:50','2019-10-31 06:04:50');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-11-06 17:24:18
