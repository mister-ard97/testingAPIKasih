-- MySQL dump 10.13  Distrib 8.0.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: kasihnusantara
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
  `paymentSource` varchar(45) NOT NULL DEFAULT 'Donation',
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
  KEY `projectId` (`projectId`),
  KEY `userId` (`userId`),
  CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`projectId`) REFERENCES `projects` (`id`),
  CONSTRAINT `payments_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (5,'pending','Donation',150000,'pending',NULL,1,1,0,NULL,0,'dev399','-',0,'2019-11-01 02:28:02','2019-11-01 02:28:02'),(6,'pending','Donation',450000,'pending',NULL,1,1,0,NULL,0,'dev434','-',0,'2019-11-01 02:48:54','2019-11-01 02:48:54'),(8,'pending','Donation',500000,'pending',NULL,3,1,0,NULL,0,'dev278','-',0,'2019-11-04 04:27:42','2019-11-04 04:27:42'),(9,'pending','Donation',240000,'pending',1,NULL,1,0,NULL,0,'dev831','-',0,'2019-11-04 09:34:43','2019-11-04 09:34:43'),(10,'pending','Subscription',100000,'pending',NULL,1,1,0,NULL,0,'dev278','-',0,'2019-11-04 04:27:42','2019-11-04 04:27:42'),(11,'pending','Subscription',100000,'pending',1,1,1,0,NULL,0,'dev831','-',0,'2019-11-04 09:34:43','2019-11-04 09:34:43'),(14,'pending','Donation',850000,'pending',4,NULL,1,0,NULL,0,'dev777','-',0,'2019-11-07 03:11:27','2019-11-07 03:11:27'),(15,'pending','Donation',200000,'pending',NULL,1,1,0,NULL,0,'dev395','-',0,'2019-11-07 03:43:35','2019-11-07 03:43:35');
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
  `isGoing` int(11) NOT NULL DEFAULT '1',
  `status` varchar(150) DEFAULT NULL,
  `isDeleted` int(11) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `projects_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (1,'projek2','<p>eokrwoekr</p>','2019-10-12 00:00:00','2019-12-12 00:00:00',2500000,'/post/image/project/PJT1572514820376.png','pkok',1,0,NULL,1,NULL,0,'2019-10-31 09:40:20','2019-10-31 09:40:20'),(2,'asdasasda','<p>asdasdas</p><p><br></p><p><img src=\"http://localhost:1998/post/image/project/Quill/PQuil1572860735736.jpg\"></p><p>asdasdas</p><p><br></p>','2019-12-12 00:00:00','2019-12-30 00:00:00',1000000,'/post/image/project/PJT1572860781145.jpg','qwe',1,0,NULL,1,NULL,0,'2019-11-04 09:46:21','2019-11-04 09:46:21'),(4,'qweqweqweqwe qwcve','<p>w<img src=\"http://localhost:1998/post/image/project/Quill/PQuil1572860844031.jpg\">er</p><p><br></p>','2019-10-12 00:00:00','2019-12-12 00:00:00',150000,'/post/image/project/PJT1572860876585.jpg','wgethrt',1,0,NULL,1,NULL,0,'2019-11-04 09:47:56','2019-11-04 09:47:56');
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
  `judul` varchar(45) DEFAULT NULL,
  `studentId` int(11) NOT NULL,
  `schoolId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `nominal` bigint(20) NOT NULL,
  `durasi` int(11) NOT NULL,
  `description` varchar(225) DEFAULT NULL,
  `shareDescription` varchar(241) DEFAULT NULL,
  `scholarshipStart` datetime NOT NULL,
  `scholarshipEnded` datetime NOT NULL,
  `isVerified` int(11) NOT NULL DEFAULT '0',
  `isOngoing` int(11) NOT NULL DEFAULT '1',
  `note` varchar(150) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scholarships`
--

LOCK TABLES `scholarships` WRITE;
/*!40000 ALTER TABLE `scholarships` DISABLE KEYS */;
INSERT INTO `scholarships` VALUES (1,'Bantu Reza Sekolah di SD ini',2,2,1,250000,3,'<p>qwe</p>','qwt','2019-10-31 08:05:16','2020-01-30 20:05:16',1,1,NULL,'2019-10-31 08:05:16','2019-11-04 05:55:30'),(3,'Bantu Siswa  Sekolah iini test123',1,2,1,1000000,4,'<p>retert</p>','wert w we ','2019-11-04 04:17:50','2020-03-04 04:17:50',1,1,NULL,'2019-11-04 04:17:50','2019-11-04 04:17:50'),(4,'Bantu Anak  Sekolah di SD ini',2,2,1,1500000,3,'<p>nunu<img src=\"http://localhost:1998/post/image/project/Quill/PQuil1572921611007.png\">umum </p>',',u,i,ioii','2019-11-05 02:40:15','2020-02-05 02:40:15',1,1,NULL,'2019-11-05 02:40:15','2019-11-05 02:55:53'),(5,'Bantu Anak  Sekolah di SD ini',2,2,1,1500000,3,'<p>nunu<img src=\"http://localhost:1998/post/image/project/Quill/PQuil1572921611007.png\">umum </p>',',u,i,ioii','2019-11-05 02:40:15','2020-02-05 02:40:15',1,1,NULL,'2019-11-05 02:40:15','2019-11-05 02:55:53');
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
  `namaPemilikRekening` varchar(45) DEFAULT NULL,
  `nomorRekening` varchar(255) DEFAULT NULL,
  `bank` varchar(45) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `email` varchar(45) NOT NULL,
  `isVerified` int(11) NOT NULL DEFAULT '0',
  `isDeleted` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schools`
--

LOCK TABLES `schools` WRITE;
/*!40000 ALTER TABLE `schools` DISABLE KEYS */;
INSERT INTO `schools` VALUES (1,'SD NEGERI 2','BSD','0812732612',NULL,'58273462333',NULL,'2019-10-24 02:19:40','2019-10-24 02:19:40','',0,0),(2,'SD NEGERI 3','Tangerang','0812732323',NULL,'58273462332',NULL,'2019-10-24 02:19:40','2019-10-24 02:19:40','',0,0),(3,'SD NEGERI 4','Jakarta','081237261',NULL,'58273462331',NULL,'2019-10-24 02:19:40','2019-10-24 02:19:40','',0,0),(4,'SD NEGERI 5','Surabaya','083623627',NULL,'58273462330',NULL,'2019-10-24 02:19:40','2019-10-24 02:19:40','',0,0),(5,'Sekolah test','BSD ','08126372726','Mandiri Simulator A','1380011819286','mandiri','2019-11-07 03:42:30','2019-11-07 03:43:04','yuvensenverd@yahoo.com',1,0);
/*!40000 ALTER TABLE `schools` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
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
  `class` varchar(45) NOT NULL,
  `studentId` int(11) DEFAULT NULL,
  `detailId` int(11) DEFAULT NULL,
  `isDeleted` int(11) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `studentId` (`studentId`),
  CONSTRAINT `studentdetailrevisions_ibfk_1` FOREIGN KEY (`studentId`) REFERENCES `studentrevisions` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studentdetailrevisions`
--

LOCK TABLES `studentdetailrevisions` WRITE;
/*!40000 ALTER TABLE `studentdetailrevisions` DISABLE KEYS */;
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
  `dataStatus` varchar(45) DEFAULT NULL,
  `statusNote` varchar(45) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `studentId` (`studentId`),
  CONSTRAINT `studentdetails_ibfk_1` FOREIGN KEY (`studentId`) REFERENCES `students` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studentdetails`
--

LOCK TABLES `studentdetails` WRITE;
/*!40000 ALTER TABLE `studentdetails` DISABLE KEYS */;
INSERT INTO `studentdetails` VALUES (1,'/student/images/RPT1572505653731.jpg','q','2',1,'Unverified',NULL,'2019-10-31 07:07:33','2019-10-31 07:07:33'),(2,'/student/images/RPT1572509086735.png','qw','1',2,'Unverified',NULL,'2019-10-31 08:04:46','2019-10-31 08:04:46');
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studentrevisions`
--

LOCK TABLES `studentrevisions` WRITE;
/*!40000 ALTER TABLE `studentrevisions` DISABLE KEYS */;
INSERT INTO `studentrevisions` VALUES (1,'mkasmf','SMP','Laki-Laki','Piatu','kqwodm','2010-11-19 17:00:00','/student/images/STD1572594371308.jpg',1,2,'mktjn fiejfjiejfd ',4,4,'2019-11-01 07:53:01','2019-11-01 08:42:36'),(2,'mkasmf','SMP','Laki-Laki','yatim','kqwodm','2010-11-19 17:00:00','/student/images/STD1572597755770.png',1,2,'mktjn fiejfjiejfd ',4,4,'2019-11-01 08:43:40','2019-11-01 08:43:56'),(3,'mkasmf','SMP','Laki-Laki','yatim','kqwodm','2010-11-19 17:00:00','/student/images/STD1572597820387.jpg',1,2,'mktjn fiejfjiejfd ',1,4,'2019-11-01 08:45:50','2019-11-01 08:46:09'),(4,'mkasmf','SMA','Laki-Laki','yatim','kqwodm','2010-11-19 17:00:00','/student/images/STD1572597950185.jpg',1,2,'mktjn fiejfjiejfd ',3,4,'2019-11-01 08:49:49','2019-11-01 08:54:56'),(5,'Testingedit','TK','Laki-Laki','yatim','Alamatz','2000-10-27 17:00:00','/student/images/STD1572588739288.png',1,2,'dfgnerin',4,3,'2019-11-01 08:49:56','2019-11-01 09:06:39'),(6,'mkasmf','SMA','Laki-Laki','yatim','kqwodm','2010-11-19 17:00:00','/student/images/STD1572598494064.PNG',1,2,'mktjn fiejfjiejfd ',1,4,'2019-11-01 09:05:38','2019-11-01 09:06:19'),(7,'mkasmf','SMA','Laki-Laki','yatim','kqwodm','2010-11-19 17:00:00','/student/images/STD1572599178392.jpg',1,2,'mktjn fiejfjiejfd ',1,4,'2019-11-01 09:06:50','2019-11-01 09:07:24'),(8,'Testingedit','TK','Laki-Laki','yatim','Alamatz','2000-10-27 17:00:00','/student/images/STD1572598196820.png',1,2,'dfgnerin',3,3,'2019-11-01 09:07:37','2019-11-01 09:08:00');
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
  `dataStatus` varchar(45) DEFAULT NULL,
  `statusNote` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `schoolId` (`schoolId`),
  CONSTRAINT `students_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `students_ibfk_2` FOREIGN KEY (`schoolId`) REFERENCES `schools` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES (1,'otk','SD','Laki-Laki','yatimpiatu','rt','1938-04-03 16:30:00','/student/images/STD1572505193848.png',0,1,'ttt',2,'Approved',NULL,'2019-10-31 06:59:53','2019-10-31 07:58:58'),(2,'rea','SMP','Laki-Laki','yatimpiatu','qweqw','2000-01-11 17:00:00','/student/images/STD1572508565127.jpg',0,1,'wrter',2,'Approved',NULL,'2019-10-31 07:56:05','2019-10-31 07:59:50'),(3,'Testingedit','TK','Laki-Laki','yatim','Alamatz','2000-10-27 17:00:00','/student/images/STD1572599279837.PNG',0,2,'dfgnerin',1,'Approved',NULL,'2019-11-01 06:12:19','2019-11-01 09:08:01'),(4,'mkasmfasd','SMA','Laki-Laki','yatim','kqwodm','2010-11-19 17:00:00','/student/images/STD1572599210127.jpg',0,2,'mktjn fiejfjiejfd ',1,'Approved',NULL,'2019-11-01 06:12:48','2019-11-01 09:07:25');
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
  `scholarshipId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `nominalSubscription` int(11) NOT NULL,
  `remainderDate` date NOT NULL,
  `isCancelled` int(11) DEFAULT '0',
  `cancelledDate` datetime DEFAULT NULL,
  `monthLeft` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscriptions`
--

LOCK TABLES `subscriptions` WRITE;
/*!40000 ALTER TABLE `subscriptions` DISABLE KEYS */;
INSERT INTO `subscriptions` VALUES (1,1,1,120000,'2019-12-30',0,NULL,12,'2019-10-31 08:05:25','2019-10-31 08:06:00'),(9,1,2,100000,'2019-11-04',0,NULL,1,'2019-11-04 05:11:40','2019-11-04 09:05:45'),(10,1,3,500000,'2000-11-05',0,NULL,3,'2019-11-04 05:45:12','2019-11-04 05:45:12'),(12,3,1,250000,'2019-12-30',0,NULL,4,'2019-11-04 06:52:33','2019-11-04 06:52:33');
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
INSERT INTO `users` VALUES (1,'yuvens liem',NULL,'yuvensenverd@gmail.com','0','ae2c7a32b3bd66bc6b6e5c9568d92fa660491bea58b4dd274b5f120b5da446bb',NULL,'/defaultPhoto/defaultUser.png','2019-10-24 02:02:18',1,'User','2019-10-24 02:02:18','2019-10-24 02:02:18'),(2,'enverd yuvens liem',NULL,'enverdyuvens@gmail.com','0','04310fcf6f60a85e8631532f3c8e83ce67990498c8d1e4049dcf8a8c1ab811c0',NULL,'/defaultPhoto/defaultUser.png','2019-10-29 02:34:04',1,'User','2019-10-29 02:34:04','2019-10-29 02:34:04'),(3,'enverdliem','16a2a478131d675f651ae06a112a4984e6ca34ae4cb7064b8868121e3d6f1e06','yuvensenverd@yahoo.com','0',NULL,NULL,'/users/KasihNusantara1572846250314.jpg','2019-11-04 05:44:10',1,'User','2019-11-04 05:44:10','2019-11-04 05:44:36');
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

-- Dump completed on 2019-11-07 16:27:56
