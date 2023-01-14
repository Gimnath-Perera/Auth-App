-- MySQL dump 10.13  Distrib 8.0.24, for Win64 (x86_64)
--
-- Host: localhost    Database: auth-4-db
-- ------------------------------------------------------
-- Server version	8.0.24

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
-- Table structure for table `otp`
--

DROP TABLE IF EXISTS `otp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `otp` (
  `id` int NOT NULL AUTO_INCREMENT,
  `otpCode` varchar(45) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `otp`
--

LOCK TABLES `otp` WRITE;
/*!40000 ALTER TABLE `otp` DISABLE KEYS */;
INSERT INTO `otp` VALUES (1,'855938','2023-01-14 10:21:26'),(2,'054538','2023-01-14 10:21:46'),(3,'300981','2023-01-14 10:29:30'),(4,'159822','2023-01-14 10:49:42'),(5,'392155','2023-01-14 11:39:25'),(6,'526746','2023-01-14 11:40:23'),(7,'172715','2023-01-14 11:42:48'),(8,'039344','2023-01-14 11:44:35'),(9,'848100','2023-01-14 11:45:20'),(10,'390158','2023-01-14 11:47:12'),(11,'590992','2023-01-14 12:21:13');
/*!40000 ALTER TABLE `otp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullName` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (65,'zoo','zoo@g.com','$2a$10$Xji8NZ9xMmwMLJdWim.1uOH5ZjUk9tWxiEtx2iE3lxycbLD8h2EhK','2022-03-26 22:40:58'),(66,'Vicky Hamill','Margaretta98@yahoo.com','$2a$10$Ib5cuJYZiD6YxK4t6R3Fo.NEih1v5m7ORo1No8.7u4nHdzdPO8KFS','2022-03-27 15:59:28'),(67,'Van Metz','Morgan.West88@yahoo.com','$2a$10$BavgSzMSGI6Z89neglSSZOu.xvLZLGd7L7ZlOq3rdYk6VAhoTjlsK','2023-01-07 19:51:29'),(68,'Eleanor Rutherford','Thomas.Luettgen@hotmail.com','$2a$10$nOPfXAkyRc7S9BB9YuE4a.b11PKyHr6aMpHkYao5t.72fvDGxhqFy','2023-01-07 20:01:25'),(69,'Opal Hickle','Ashtyn.Bode@yahoo.com','$2a$10$qSDO7csQjJtGgFp86CzLwuCp.5gkmhr6Tiyd/W3OyaXhbihH1lhPi','2023-01-07 20:05:26'),(72,'Mrs. Jeffrey Rowe','Kirstin43@yahoo.com','$2a$10$CXUXlNaCqNkIo8MQZRpmn.gIObM5yECg1Gwl5eugSU4VZ2tCOgwQ.','2023-01-07 20:10:07'),(75,'Victoria Hermiston','Margie1@yahoo.com','$2a$10$v.9QNXHz0PMYUPqrDCh8wezGEcpE7fb6UyURdHadREFWW5gTlGbNW','2023-01-14 09:28:27'),(77,'Gimnath Priyadarshana Perera','gimnathperera@gmail.com','$2a$10$bLRBIyPq8HTLbuCHaNq.l.yB7lYkpB0CJbClOgJwhceh83/s0/wOq','2023-01-14 12:20:59');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-01-14 12:24:53
