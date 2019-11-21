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
  `paymentSource` varchar(45) DEFAULT NULL,
  `nominal` int(11) DEFAULT NULL,
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
  `noPembayaran` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `projectId` (`projectId`),
  KEY `scholarshipId` (`scholarshipId`),
  KEY `userId` (`userId`),
  CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`projectId`) REFERENCES `projects` (`id`),
  CONSTRAINT `payments_ibfk_2` FOREIGN KEY (`scholarshipId`) REFERENCES `scholarships` (`id`),
  CONSTRAINT `payments_ibfk_3` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (1,'pending','',2000000,'pending',1,NULL,2,0,NULL,0,'dev-500','-',0,'0','2019-10-29 08:18:54','2019-10-29 08:18:54'),(2,'pending','',7000000,'pending',1,NULL,2,0,NULL,0,'dev-318','-',0,'0','2019-10-29 08:19:26','2019-10-29 08:19:26'),(3,'pending','',10000000,'pending',2,NULL,2,0,NULL,0,'dev-296','-',0,'0','2019-10-29 09:05:01','2019-10-29 09:05:01'),(4,'pending','',100000,'pending',1,NULL,2,0,NULL,0,'dev-361','-',0,'0','2019-10-29 09:51:23','2019-10-29 09:51:23'),(5,'pending','',900000,'pending',2,NULL,2,0,NULL,0,'dev-668','-',0,'0','2019-10-29 09:57:03','2019-10-29 09:57:03');
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payouts`
--

DROP TABLE IF EXISTS `payouts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payouts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `projectId` int(11) DEFAULT NULL,
  `scholarshipId` int(11) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `beneficiary_name` varchar(255) DEFAULT NULL,
  `beneficiary_account` varchar(255) DEFAULT NULL,
  `bank` varchar(255) DEFAULT NULL,
  `reference_no` varchar(255) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `beneficiary_email` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payouts`
--

LOCK TABLES `payouts` WRITE;
/*!40000 ALTER TABLE `payouts` DISABLE KEYS */;
/*!40000 ALTER TABLE `payouts` ENABLE KEYS */;
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
  `currentValue` int(11) DEFAULT NULL,
  `totalTarget` int(11) NOT NULL,
  `projectImage` varchar(255) NOT NULL,
  `shareDescription` varchar(255) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `isCancelled` int(11) NOT NULL DEFAULT '0',
  `cancelledDate` datetime DEFAULT NULL,
  `isGoing` int(11) NOT NULL DEFAULT '1',
  `isDeleted` int(11) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `projects_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (1,'Project 1','<p><strong>Project 1</strong></p><p><strong>Donasi ke project 1</strong></p>','2019-10-25 00:00:00','2019-10-31 00:00:00',0,10000000,'/post/image/project/PJT1573024649971.jpg','Ayo Donasi',2,0,NULL,1,0,'2019-10-24 03:13:27','2019-11-06 07:17:29'),(2,'Project 2 Murid 2','<p>Project 2</p><p>Donasi ke Project 2</p>','2019-10-26 00:00:00','2019-10-30 00:00:00',0,20000000,'/post/image/project/PJT1573024662376.jpg','Donasi 2 ayo bantu',2,0,NULL,1,0,'2019-10-24 03:15:20','2019-11-06 07:17:42'),(3,'Project 2 Murid 3','<p>Project 2</p><p>Donasi ke Project 2</p>','2019-10-26 00:00:00','2019-10-30 00:00:00',0,20000000,'/post/image/project/PJT1573024662376.jpg','Donasi 2 ayo bantu',2,0,NULL,1,0,'2019-10-24 03:15:20','2019-11-06 07:17:42');
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
  `judul` varchar(255) NOT NULL,
  `studentId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `currentValue` int(11) DEFAULT NULL,
  `isVerified` varchar(255) DEFAULT '0',
  `isOngoing` varchar(255) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `studentId` (`studentId`),
  KEY `userId` (`userId`),
  CONSTRAINT `scholarships_ibfk_1` FOREIGN KEY (`studentId`) REFERENCES `students` (`id`),
  CONSTRAINT `scholarships_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scholarships`
--

LOCK TABLES `scholarships` WRITE;
/*!40000 ALTER TABLE `scholarships` DISABLE KEYS */;
INSERT INTO `scholarships` VALUES (1,'Ringankan biaya bulanan Murid 2',1,2,1,'1','1','2019-10-30 04:15:13','2019-11-04 04:30:00'),(2,'Ringankan Biaya Murid 1',2,2,1,'1','1','2019-11-04 04:46:48','2019-11-05 04:22:55'),(3,'Ringankan Biaya bulanan Murid 3',3,2,1,'1','1','2019-11-05 04:26:10','2019-11-05 04:37:47'),(4,'Ringankan biaya bulanan Murid 2',4,2,1,'1','1','2019-10-30 04:15:13','2019-11-04 04:30:00'),(5,'Ringankan Biaya Murid 1',1,2,1,'1','1','2019-11-04 04:46:48','2019-11-05 04:22:55'),(6,'Ringankan Biaya bulanan Murid 3',2,2,1,'1','1','2019-11-05 04:26:10','2019-11-05 04:37:47'),(7,'Ringankan biaya bulanan Murid 2',3,2,1,'1','1','2019-10-30 04:15:13','2019-11-04 04:30:00'),(8,'Ringankan Biaya Murid 1',4,2,1,'1','1','2019-11-04 04:46:48','2019-11-05 04:22:55'),(9,'Ringankan Biaya bulanan Murid 3',1,2,1,'1','1','2019-11-05 04:26:10','2019-11-05 04:37:47'),(10,'Ringankan biaya bulanan Murid 2',2,2,1,'1','1','2019-10-30 04:15:13','2019-11-04 04:30:00'),(11,'Ringankan Biaya Murid 1',3,2,1,'1','1','2019-11-04 04:46:48','2019-11-05 04:22:55'),(12,'Ringankan Biaya bulanan Murid 3',4,2,1,'1','1','2019-11-05 04:26:10','2019-11-05 04:37:47'),(13,'Halo dunia',1,14,1,'1','1','2019-11-17 00:32:15','2019-11-17 00:45:56');
/*!40000 ALTER TABLE `scholarships` ENABLE KEYS */;
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
INSERT INTO `sequelizemeta` VALUES ('20191023083309-create-user.js'),('20191023083325-create-student.js'),('20191023083801-create-project.js'),('20191023083824-create-scholarship.js'),('20191023083836-create-student-revision.js'),('20191024082443-create-payment.js'),('20191029021507-create-subscription.js'),('20191107064611-create-payout.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
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
  `shareDescription` varchar(255) NOT NULL,
  `nomorRekening` varchar(255) NOT NULL,
  `pemilikRekening` varchar(255) NOT NULL,
  `alamatSekolah` varchar(255) NOT NULL,
  `bank` varchar(255) NOT NULL,
  `cabangBank` varchar(255) NOT NULL,
  `teleponSekolah` varchar(255) NOT NULL,
  `namaSekolah` varchar(255) NOT NULL,
  `kartuSiswa` varchar(255) NOT NULL,
  `raportTerakhir` varchar(255) NOT NULL,
  `kartuKeluarga` varchar(255) NOT NULL,
  `jumlahSaudara` int(11) NOT NULL,
  `biayaSekolah` int(11) NOT NULL,
  `kelas` varchar(255) NOT NULL,
  `dataPenghasilan` varchar(255) NOT NULL,
  `studentId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `studentId` (`studentId`),
  CONSTRAINT `studentrevisions_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `studentrevisions_ibfk_2` FOREIGN KEY (`studentId`) REFERENCES `students` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studentrevisions`
--

LOCK TABLES `studentrevisions` WRITE;
/*!40000 ALTER TABLE `studentrevisions` DISABLE KEYS */;
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
  `provinsi` varchar(45) NOT NULL,
  `isDeleted` int(11) NOT NULL DEFAULT '0',
  `userId` int(11) DEFAULT NULL,
  `story` varchar(255) DEFAULT NULL,
  `shareDescription` varchar(255) NOT NULL,
  `nomorRekening` varchar(255) NOT NULL,
  `pemilikRekening` varchar(255) NOT NULL,
  `alamatSekolah` varchar(255) NOT NULL,
  `bank` varchar(255) NOT NULL,
  `cabangBank` varchar(255) NOT NULL,
  `teleponSekolah` varchar(255) NOT NULL,
  `namaSekolah` varchar(255) NOT NULL,
  `kartuSiswa` varchar(255) NOT NULL,
  `raportTerakhir` varchar(255) NOT NULL,
  `kartuKeluarga` varchar(255) NOT NULL,
  `jumlahSaudara` int(11) NOT NULL,
  `biayaSekolah` int(11) NOT NULL,
  `kelas` varchar(255) NOT NULL,
  `dataPenghasilan` varchar(255) NOT NULL,
  `dataStatus` varchar(255) NOT NULL,
  `statusNote` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `students_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES (1,'Muhammad Reza Ardiansyah','SMP','Pria','Normal','Tangerang','1997-10-07 00:00:00','/student/images/STD1574257164785.jpg','BANTEN',0,1,'<p>Halo nama saya Muhammad Reza Ardiansyah</p><p><br></p><p>Ini adalah keluarga saya</p><p><br></p><p><img src=\"http://localhost:2019/post/image/scholarship/PQuil1574256918115.jpg\" width=\"512\" style=\"cursor: nwse-resize;\"></p>','Harap bantu siswa ini supaya bisa sekolah dengan tenang','0611101146','BCA Simulator A','Jalan Tangerang','PT. BANK CENTRAL ASIA TBK.','Cibodas','081122223333','SMP 1 Tangerang','/student/images/STD1574257164789.jpg','/student/images/STD1574257164791.png','/student/images/STD1574257164795.jpeg',4,100000,'2','/student/images/STD1574257164798.jpg','Unverified','','2019-11-20 20:39:24','2019-11-20 20:39:24'),(2,'Selena Ayu','SMA','Wanita','Piatu','Jalan Kamboja 5 no. 10','1996-11-11 00:00:00','/student/images/STD1574290884999.png','SUMATERA UTARA',0,1,'<p>Halo nama saya Selena Ayu.</p><p><br></p><p>Saya tinggal di provinsi Sumatera Utara</p>','Ayo Bantu Selena untuk bisa lulus tanpa ada masalah.','1380011819286','Mandiri Simulator A','Jalan Flores 3 no. 11','PT. BANK MANDIRI (PERSERO) TBK.','Medan','081122223333','SMA 5 Sumatera Utara','/student/images/STD1574290885005.jpeg','/student/images/STD1574290885059.png','/student/images/STD1574290885069.jpeg',2,200000,'2','/student/images/STD1574290885072.jpg','Unverified','','2019-11-21 06:01:25','2019-11-21 06:01:25'),(3,'Mutia Ayu','SMA','Wanita','YatimPiatu','Jalan Hasanudin 5 no. 10','2000-10-11 00:00:00','/student/images/STD1574291285618.JPG','ACEH',0,1,'<p>Halo nama saya mutia ayu.</p><p><br></p><p>Saya tinggal bersama bibi saya. Orang tua saya meninggal disaat saya berumur 3 tahun.</p>','Ayu bantu mutia agar bisa melanjutkan pendidikannya.','4111911431','Permata Simulator A','Jalan Kenangan 5 no. 10','PT. BANK PERMATA TBK.','Bireuen','081122223333','SMA 1 Aceh','/student/images/STD1574291285655.jpeg','/student/images/STD1574291285660.png','/student/images/STD1574291285667.jpeg',3,100000,'2','/student/images/STD1574291285670.jpg','Unverified','','2019-11-21 06:08:05','2019-11-21 06:08:05'),(4,'Siti Nur Indah','SD','Wanita','Yatim','Jalan Senopati 5 no. 8','2007-10-11 00:00:00','/student/images/STD1574291831606.jpg','JAWA BARAT',0,1,'<p>Halo nama saya Siti.</p><p><br></p><p>Saya masih duduk di kelas 5 SD.</p><p><br></p><p>Saya tinggal bersama ibu saya.</p><p><br></p><p>Ibu saya adalah penjual makanan. Setiap hari ibu saya selalu berangkat pagi hingga sore hari.</p>','Ayo semua para donatur agar bisa membantu Siti sehingga kita semua bisa meringankan biaya hidup Ibunya.','1380011819286','Mandiri Simulator A','Jalan Baja 7 no. 10','PT. BANK MANDIRI (PERSERO) TBK.','Bandung','081122223333','SDN 6 Jawa Barat','/student/images/STD1574291831608.jpeg','/student/images/STD1574291831629.png','/student/images/STD1574291831633.jpeg',0,90000,'5','/student/images/STD1574291831635.jpg','Unverified','','2019-11-21 06:17:11','2019-11-21 06:17:11');
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
  `remainderDate` datetime DEFAULT NULL,
  `isCancelled` int(11) DEFAULT '0',
  `cancelledDate` datetime DEFAULT NULL,
  `monthLeft` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscriptions`
--

LOCK TABLES `subscriptions` WRITE;
/*!40000 ALTER TABLE `subscriptions` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Yubi Kitta',NULL,'yubikitta@gmail.com','0','f0adf2ad8a08ecb17029e155b66c0413c891b3212ff85dca1f7a773c5841e80a',NULL,'/defaultPhoto/defaultUser.png','2019-11-20 19:57:00',1,'User','2019-11-20 19:57:00','2019-11-20 19:57:00');
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

-- Dump completed on 2019-11-21  9:57:36
