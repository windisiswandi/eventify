-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 19, 2023 at 08:35 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_appevent`
--

-- --------------------------------------------------------

--
-- Table structure for table `agenda`
--

CREATE TABLE `agenda` (
  `id` int(11) NOT NULL,
  `id_event` int(11) NOT NULL,
  `nama` varchar(200) NOT NULL,
  `deskripsi` text NOT NULL,
  `tanggal` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `anggaran`
--

CREATE TABLE `anggaran` (
  `id` int(11) NOT NULL,
  `id_event` int(11) NOT NULL,
  `nama_section` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `anggota_devisi`
--

CREATE TABLE `anggota_devisi` (
  `id` int(11) NOT NULL,
  `id_devisi` varchar(50) NOT NULL,
  `nama_anggota` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `anggota_devisi`
--

INSERT INTO `anggota_devisi` (`id`, `id_devisi`, `nama_anggota`) VALUES
(12, 'Q1Mmsz', 'Fatih'),
(13, '5xrX7q', 'Fatih');

-- --------------------------------------------------------

--
-- Table structure for table `ceklist`
--

CREATE TABLE `ceklist` (
  `id` int(11) NOT NULL,
  `id_event` int(11) NOT NULL,
  `nama_ceklist` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `judul` varchar(150) NOT NULL,
  `deskripsi` text NOT NULL,
  `tanggal` date NOT NULL,
  `kategori` varchar(100) NOT NULL,
  `foto` varchar(150) NOT NULL,
  `kode` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `judul`, `deskripsi`, `tanggal`, `kategori`, `foto`, `kode`) VALUES
(18, 'event 5', 'deskripsi event 5', '2002-10-10', 'kategori event 5', 'foto event 5.jpg', 'kode_event5');

-- --------------------------------------------------------

--
-- Table structure for table `item_anggaran`
--

CREATE TABLE `item_anggaran` (
  `id` int(11) NOT NULL,
  `id_anggaran` int(11) NOT NULL,
  `uraian` varchar(100) NOT NULL,
  `volume` int(11) NOT NULL,
  `rincian` varchar(100) NOT NULL,
  `harga_satuan` int(11) NOT NULL,
  `total` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `item_ceklist`
--

CREATE TABLE `item_ceklist` (
  `id` int(11) NOT NULL,
  `id_ceklist` int(11) NOT NULL,
  `nama_item` varchar(100) NOT NULL,
  `is_ceklist` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `join_event`
--

CREATE TABLE `join_event` (
  `id` int(11) NOT NULL,
  `kode_event` varchar(100) NOT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `panitia`
--

CREATE TABLE `panitia` (
  `id` int(11) NOT NULL,
  `id_event` int(11) NOT NULL,
  `nama_devisi` varchar(100) NOT NULL,
  `id_devisi` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `panitia`
--

INSERT INTO `panitia` (`id`, `id_event`, `nama_devisi`, `id_devisi`) VALUES
(8, 18, 'Devisi Acara', '5xrX7q');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `alamat` text DEFAULT NULL,
  `telp` varchar(15) DEFAULT NULL,
  `jenis_kelamin` varchar(25) DEFAULT NULL,
  `tgl_lahir` date DEFAULT NULL,
  `deskripsi` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `nama`, `email`, `password`, `alamat`, `telp`, `jenis_kelamin`, `tgl_lahir`, `deskripsi`) VALUES
(1, 'mena', 'mena@gmail.com', '$2b$10$QXG6NTG299I6VVS3le2b5eXyg.TcEJYq9hsMr7VDK1IQkxCKvwkg2', '', '', '', '0000-00-00', ''),
(2, 'johan', 'johan@gmail.com', '$2b$10$ZrfTGR9.s36738Mfzuox7e8VqiBavLZVopEhtSuKPeqmiI8Mu57Nq', '', '', '', '0000-00-00', ''),
(5, 'aldi', 'aldi@gmail.com', '$2b$10$dogBRp1ao4GXgSh5TOmlBOVdL.14JYgNzkQv41NHke3P6wPfK0O26', NULL, NULL, NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `agenda`
--
ALTER TABLE `agenda`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `anggaran`
--
ALTER TABLE `anggaran`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `anggota_devisi`
--
ALTER TABLE `anggota_devisi`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ceklist`
--
ALTER TABLE `ceklist`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `kode` (`kode`);

--
-- Indexes for table `item_anggaran`
--
ALTER TABLE `item_anggaran`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `item_ceklist`
--
ALTER TABLE `item_ceklist`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `join_event`
--
ALTER TABLE `join_event`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `panitia`
--
ALTER TABLE `panitia`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_devisi` (`id_devisi`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `agenda`
--
ALTER TABLE `agenda`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `anggaran`
--
ALTER TABLE `anggaran`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `anggota_devisi`
--
ALTER TABLE `anggota_devisi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `ceklist`
--
ALTER TABLE `ceklist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `item_anggaran`
--
ALTER TABLE `item_anggaran`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `item_ceklist`
--
ALTER TABLE `item_ceklist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `join_event`
--
ALTER TABLE `join_event`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `panitia`
--
ALTER TABLE `panitia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
