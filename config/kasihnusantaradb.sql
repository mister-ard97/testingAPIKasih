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
  `projectId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `isRefund` int(11) NOT NULL DEFAULT '0',
  `refundDate` datetime DEFAULT NULL,
  `isDeleted` int(11) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `projectId` (`projectId`),
  KEY `userId` (`userId`),
  CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`projectId`) REFERENCES `projects` (`id`),
  CONSTRAINT `payments_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
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
  `name` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `projectCreated` datetime NOT NULL,
  `projectEnded` datetime NOT NULL,
  `totalTarget` int(11) NOT NULL,
  `projectImage` varchar(255) DEFAULT NULL,
  `shareDescription` varchar(255) NOT NULL DEFAULT '-',
  `userId` int(11) DEFAULT NULL,
  `isCancelled` int(11) NOT NULL DEFAULT '0',
  `cancelledDate` datetime DEFAULT NULL,
  `isDeleted` int(11) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `projects_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (1,'test 123','<p>test 123</p>','2019-10-31 00:00:00','2019-10-18 00:00:00',1500000,'/post/image/project/PJT1571296244305.png','Ayo kita membantu project ke 1',2,0,NULL,0,'2019-10-17 07:10:44','2019-10-17 07:10:44'),(2,'Project 1','<p><strong>Test 123</strong></p>','2019-10-18 00:00:00','2019-10-24 00:00:00',2500000,'/post/image/project/PJT1571305760419.png','Ayo kita membantu project ke 2',22,0,NULL,0,'2019-10-17 09:49:20','2019-10-17 09:49:20'),(3,'Project 2','<p><strong>Donasi ke murid</strong></p>','2019-10-18 00:00:00','2019-10-24 00:00:00',20000000,'/post/image/project/PJT1571306162729.jpg','Ayo kita membantu project ke 3',22,0,NULL,0,'2019-10-17 09:56:02','2019-10-17 09:56:02'),(4,'Project 3','<p><strong>Donasi ke murid</strong></p>','2019-10-18 00:00:00','2019-10-24 00:00:00',20000000,'/post/image/project/PJT1571306162810.jpg','Ayo kita membantu project ke 4',22,0,NULL,0,'2019-10-17 09:56:02','2019-10-17 09:56:02'),(5,'Project 4','<p><strong>Donasi ke murid</strong></p>','2019-10-18 00:00:00','2019-10-24 00:00:00',20000000,'/post/image/project/PJT1571306165652.jpg','Ayo kita membantu project ke 5',22,0,NULL,0,'2019-10-17 09:56:05','2019-10-17 09:56:05'),(6,'Project 5','<p><strong>Donasi ke murid</strong></p>','2019-10-18 00:00:00','2019-10-24 00:00:00',20000000,'/post/image/project/PJT1571306165632.jpg','Ayo kita membantu project ke 6',22,0,NULL,0,'2019-10-17 09:56:05','2019-10-17 09:56:05'),(7,'Project 6','<p><strong>Donasi ke murid</strong></p>','2019-10-18 00:00:00','2019-10-24 00:00:00',20000000,'/post/image/project/PJT1571306211291.jpg','Ayo kita membantu project ke 7',22,0,NULL,0,'2019-10-17 09:56:51','2019-10-17 09:56:51'),(8,'Project 7','<p><strong>Donasi ke murid</strong></p>','2019-10-18 00:00:00','2019-10-24 00:00:00',20000000,'/post/image/project/PJT1571306328737.jpg','Ayo kita membantu project ke 8',22,0,NULL,0,'2019-10-17 09:58:48','2019-10-17 09:58:48'),(9,'Project 8','<p><strong>Donasi ke murid</strong></p>','2019-10-18 00:00:00','2019-10-24 00:00:00',20000000,'/post/image/project/PJT1571306328752.jpg','Ayo kita membantu project ke 9',22,0,NULL,0,'2019-10-17 09:58:48','2019-10-17 09:58:48'),(10,'Project 9','<p><strong>Donasi ke murid</strong></p>','2019-10-18 00:00:00','2019-10-24 00:00:00',20000000,'/post/image/project/PJT1571306459693.jpg','Ayo kita membantu siswa A supaya bisa bersekolah di sekolah yang baik.',22,0,NULL,0,'2019-10-17 10:00:59','2019-10-17 10:00:59');
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
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
INSERT INTO `sequelizemeta` VALUES ('20191015084548-create-user.js'),('20191015085157-create-student.js'),('20191015085803-create-student-detail.js'),('20191015092028-create-project.js'),('20191015093140-create-payment.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `studentdetails`
--

DROP TABLE IF EXISTS `studentdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `studentdetails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pictureReport` varchar(255) DEFAULT NULL,
  `deskripsi` varchar(255) DEFAULT NULL,
  `studentId` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `studentId` (`studentId`),
  CONSTRAINT `studentdetails_ibfk_1` FOREIGN KEY (`studentId`) REFERENCES `students` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studentdetails`
--

LOCK TABLES `studentdetails` WRITE;
/*!40000 ALTER TABLE `studentdetails` DISABLE KEYS */;
/*!40000 ALTER TABLE `studentdetails` ENABLE KEYS */;
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
  `userId` int(11) NOT NULL,
  `story` varchar(255) NOT NULL,
  `sekolah` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `students_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
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
  `phoneNumber` varchar(255) NOT NULL,
  `isGoogle` varchar(65) DEFAULT NULL,
  `isFacebook` varchar(65) DEFAULT NULL,
  `userImage` varchar(255) NOT NULL,
  `lastLogin` datetime NOT NULL,
  `verified` int(11) NOT NULL DEFAULT '0',
  `role` varchar(255) NOT NULL,
  `subscriptionStatus` int(11) NOT NULL DEFAULT '0',
  `subscriptionNominal` int(11) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'reza','3472ea7a82b87126a2431e1a46a0fe1be2c2474d5d713bc27df486feae8b1fc9','reza@gmail.com','','0','0','/defaultPhoto/defaultUser.png','2019-10-15 23:57:21',0,'User',0,0,'2019-10-15 23:57:21','2019-10-15 23:57:21'),(2,'reza','3472ea7a82b87126a2431e1a46a0fe1be2c2474d5d713bc27df486feae8b1fc9','reza@gmail.com','','0','0','/defaultPhoto/defaultUser.png','2019-10-16 02:05:46',0,'User',0,0,'2019-10-16 02:05:46','2019-10-16 02:05:46'),(3,'reza123344','3472ea7a82b87126a2431e1a46a0fe1be2c2474d5d713bc27df486feae8b1fc9','reza123456@gmail.com','081122223333','0','0','/defaultPhoto/defaultUser.png','2019-10-16 03:19:56',0,'User',0,0,'2019-10-16 03:19:56','2019-10-16 03:19:56'),(4,'reza123344','3472ea7a82b87126a2431e1a46a0fe1be2c2474d5d713bc27df486feae8b1fc9','reza123456@gmail.com','081122223333','0','0','/defaultPhoto/defaultUser.png','2019-10-16 03:21:07',0,'User',0,0,'2019-10-16 03:21:07','2019-10-16 03:21:07'),(5,'reza123344','3472ea7a82b87126a2431e1a46a0fe1be2c2474d5d713bc27df486feae8b1fc9','reza1234sssss56@gmail.com','081122223333','0','0','/defaultPhoto/defaultUser.png','2019-10-16 03:22:34',0,'User',0,0,'2019-10-16 03:22:34','2019-10-16 03:22:34'),(6,'reza123344','3472ea7a82b87126a2431e1a46a0fe1be2c2474d5d713bc27df486feae8b1fc9','reza1234ssssssadasdasd56@gmail.com','081122223333','0','0','/defaultPhoto/defaultUser.png','2019-10-16 03:25:39',0,'User',0,0,'2019-10-16 03:25:39','2019-10-16 03:25:39'),(7,'reza123','3472ea7a82b87126a2431e1a46a0fe1be2c2474d5d713bc27df486feae8b1fc9','rezardiansayh1997@gmail.com','081122223333','0','0','/defaultPhoto/defaultUser.png','2019-10-16 03:26:20',0,'User',0,0,'2019-10-16 03:26:20','2019-10-16 03:26:20'),(8,'reza','3472ea7a82b87126a2431e1a46a0fe1be2c2474d5d713bc27df486feae8b1fc9','dede@reza.com','081122223333','0','0','/defaultPhoto/defaultUser.png','2019-10-17 23:49:54',0,'User',0,0,'2019-10-16 03:30:40','2019-10-17 23:49:54'),(9,'reza','3472ea7a82b87126a2431e1a46a0fe1be2c2474d5d713bc27df486feae8b1fc9','dede123@reza.com','081122223333','0','0','/defaultPhoto/defaultUser.png','2019-10-16 03:31:50',0,'User',0,0,'2019-10-16 03:31:50','2019-10-16 03:31:50'),(22,'Yubi Kitta',NULL,'yubikitta@gmail.com','0','f0adf2ad8a08ecb17029e155b66c0413c891b3212ff85dca1f7a773c5841e80a',NULL,'/defaultPhoto/defaultUser.png','2019-10-16 10:38:41',1,'User',0,0,'2019-10-16 10:38:41','2019-10-16 10:38:41'),(23,'Reza Ardi',NULL,'rezamusashi@gmail.com','0',NULL,'215b896a8f42040a49e7d2facf0246b206dda5bc0e8626be847ca01aa3981a46','/defaultPhoto/defaultUser.png','2019-10-16 10:40:19',1,'User',0,0,'2019-10-16 10:40:19','2019-10-16 10:40:19');
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

-- Dump completed on 2019-10-18 11:43:51
