-- --------------------------------------------------------
-- Host:                         localhost
-- Server version:               5.7.19 - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for vouchershop
CREATE DATABASE IF NOT EXISTS `vouchershop` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `vouchershop`;

-- Dumping structure for table vouchershop.konfirmasis
CREATE TABLE IF NOT EXISTS `konfirmasis` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `topupId` int(11) DEFAULT NULL,
  `banknumber` varchar(255) DEFAULT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT 'proses',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table vouchershop.konfirmasis: ~0 rows (approximately)
/*!40000 ALTER TABLE `konfirmasis` DISABLE KEYS */;
/*!40000 ALTER TABLE `konfirmasis` ENABLE KEYS */;

-- Dumping structure for table vouchershop.orders
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `voucherId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `jumlah` int(11) DEFAULT NULL,
  `nominal` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table vouchershop.orders: ~0 rows (approximately)
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;

-- Dumping structure for table vouchershop.sequelizemeta
CREATE TABLE IF NOT EXISTS `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table vouchershop.sequelizemeta: ~5 rows (approximately)
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` (`name`) VALUES
	('20190706060916-create-user.js'),
	('20190706061233-create-voucher.js'),
	('20190706061524-create-order.js'),
	('20190707080719-create-topup.js'),
	('20190707110648-create-konfirmasi.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;

-- Dumping structure for table vouchershop.topups
CREATE TABLE IF NOT EXISTS `topups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `nominal` int(11) DEFAULT NULL,
  `taxcode` varchar(255) DEFAULT NULL,
  `uniquevalue` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT 'proses',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Dumping data for table vouchershop.topups: ~1 rows (approximately)
/*!40000 ALTER TABLE `topups` DISABLE KEYS */;
/*!40000 ALTER TABLE `topups` ENABLE KEYS */;

-- Dumping structure for table vouchershop.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `saldo` varchar(255) DEFAULT '0',
  `role` varchar(255) DEFAULT 'member',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- Dumping data for table vouchershop.users: ~2 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `password`, `saldo`, `role`, `createdAt`, `updatedAt`) VALUES
	(1, 'admin', 'admin', 'admin@admin.com', '$2b$10$KpLGaYAQnE.LioJJrZ1mqOEYlQfTy/EOuob7wLH5yRKYP6h3QNU..', '0', 'admin', '2019-07-06 15:02:26', '2019-07-07 14:58:56'),
	(3, 'hello', 'hei', 'hello123@admin.com', '$2b$10$KpLGaYAQnE.LioJJrZ1mqOEYlQfTy/EOuob7wLH5yRKYP6h3QNU..', '20000', 'member', '2019-07-06 09:49:15', '2019-07-07 18:07:03');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

-- Dumping structure for table vouchershop.vouchers
CREATE TABLE IF NOT EXISTS `vouchers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `harga` int(11) DEFAULT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `serialnumber` varchar(255) DEFAULT NULL,
  `stok` int(11) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Dumping data for table vouchershop.vouchers: ~3 rows (approximately)
/*!40000 ALTER TABLE `vouchers` DISABLE KEYS */;
INSERT INTO `vouchers` (`id`, `harga`, `nama`, `serialnumber`, `stok`, `createdAt`, `updatedAt`) VALUES
	(2, 15000, 'Voucher Steal Wallet 10000', '4908-3472-5427-9023', 3, '2019-07-06 18:05:44', '2019-07-07 13:41:07'),
	(3, 25000, 'Voucher Steal Wallet 20000', '5804-2867-5911-7704', 100, '2019-07-06 18:05:59', '2019-07-06 18:05:59'),
	(4, 100000, 'Voucher Discount Tolped 100000', '2312-2232-1123-2221', 107, '2019-07-07 21:41:03', '2019-07-07 15:43:38');
/*!40000 ALTER TABLE `vouchers` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
