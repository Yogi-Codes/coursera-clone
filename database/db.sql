-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 03, 2023 at 05:24 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `react_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(255) NOT NULL,
  `name` varchar(250) DEFAULT NULL,
  `phone` varchar(150) DEFAULT NULL,
  `email` varchar(250) DEFAULT NULL,
  `password` varchar(250) DEFAULT NULL,
  `rank` varchar(150) DEFAULT NULL,
  `status` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `name`, `phone`, `email`, `password`, `rank`, `status`) VALUES
(1, 'Admin Kanai', '123456790', 'email@gmail.com', '123456', 'Admin', 'Active'),
(3, 'Jit Banerjee', '1234567890', 'jit@cehpoint.co.in', '321654987', 'Admin', 'Active');

-- --------------------------------------------------------



CREATE TABLE `questions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  question TEXT NOT NULL,
  `a` TEXT NOT NULL,
  `b` TEXT NOT NULL,
  `c` TEXT NOT NULL,
  `d` TEXT NOT NULL,
  `correct` CHAR(1) NOT NULL,
  `marks` INT NOT NULL,
  `exam_id` INT NOT NULL,
  `course_id` INT NOT NULL,
  `etype` VARCHAR(255) NOT NULL DEFAULT 'QUIZ',
  `status` ENUM('Pending', 'Approved', 'Rejected') NOT NULL DEFAULT 'Pending',
  PRIMARY KEY (id)
);



--
-- Table structure for table `chapters`
--

CREATE TABLE `chapters` (
  `id` int(255) NOT NULL,
  `title` varchar(250) DEFAULT NULL,
  `course_id` varchar(150) DEFAULT NULL,
  `duration` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `chapters`
--

INSERT INTO `chapters` (`id`, `title`, `course_id`, `duration`) VALUES
(2, 'Week 2', '20', '7'),
(4, 'Week 3', '20', '7'),
(5, 'Week 4', '20', '7'),
(6, 'Week 5', '20', '7');

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE `company` (
  `id` int(255) NOT NULL,
  `name` varchar(250) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `address` varchar(250) DEFAULT NULL,
  `facebook` varchar(250) DEFAULT NULL,
  `linkedin` varchar(250) DEFAULT NULL,
  `instagram` varchar(250) DEFAULT NULL,
  `twitter` varchar(250) DEFAULT NULL,
  `whatsapp` varchar(150) DEFAULT NULL,
  `youtube` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`id`, `name`, `email`, `phone`, `address`, `facebook`, `linkedin`, `instagram`, `twitter`, `whatsapp`, `youtube`) VALUES
(1, 'IBC Media', 'info@ibc.co', '1234567890', 'Test Address', 'https://facebook.com/dsf/', 'https://linkedin.in/sd/sd', 'https://instagram.com/sdsdgifdg', 'https://twitter.com/sdsidhh', 'https://wa.me/sdfsjdfhbujshi', 'https://youtube.com/channel/fdsufgiusgfu');

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` int(255) NOT NULL,
  `name` varchar(250) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `subject` varchar(150) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `status` varchar(150) DEFAULT 'Pending',
  `date` varchar(150) DEFAULT NULL,
  `time` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`id`, `name`, `email`, `subject`, `description`, `status`, `date`, `time`) VALUES
(1, 'Test', 'test@gmail.co', 'Test Subject', 'Test Description ', 'Deleted', '', ''),
(2, 'Test', 'test@gmail.co', 'Test Subject', 'Test Description ', 'Deleted', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `contents`
--

CREATE TABLE `contents` (
  `id` int(255) NOT NULL,
  `course_id` varchar(250) DEFAULT NULL,
  `title` varchar(500) DEFAULT NULL,
  `type` varchar(250) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `chapter` varchar(150) DEFAULT NULL,
  `thumbnail` varchar(150) DEFAULT NULL,
  `date` varchar(150) DEFAULT NULL,
  `time` varchar(50) DEFAULT NULL,
  `uid` varchar(150) DEFAULT NULL,
  `status` varchar(150) DEFAULT NULL,
  `week` varchar(150) DEFAULT NULL,
  `reading_time` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `content_transactions`
--

CREATE TABLE `content_transactions` (
  `id` int(255) NOT NULL,
  `course_id` varchar(150) DEFAULT NULL,
  `content_id` varchar(255) DEFAULT NULL,
  `user_id` varchar(150) DEFAULT NULL,
  `status` varchar(150) DEFAULT NULL,
  `date` varchar(50) DEFAULT NULL,
  `time` varchar(50) DEFAULT NULL,
  `progress` varchar(255) DEFAULT NULL,
  `tmp_progress` varchar(255) DEFAULT NULL,
  `mins` varchar(150) DEFAULT NULL,
  `done_mins` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int(255) NOT NULL,
  `title` varchar(250) DEFAULT NULL,
  `price` varchar(50) DEFAULT NULL,
  `category` varchar(250) DEFAULT NULL,
  `thumbnail` varchar(150) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `short_description` varchar(500) DEFAULT NULL,
  `uid` varchar(150) DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `date` varchar(50) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `title`, `price`, `category`, `thumbnail`, `description`, `short_description`, `uid`, `author`, `date`, `status`) VALUES
(23, 'test', '150', 'Arts and Humanities', '1672290982743wordpress-developer.png', '<p>asdasd ds&nbsp;</p>', NULL, '1', NULL, '1672290982743', 'Pending');

-- --------------------------------------------------------

--
-- Table structure for table `course_category`
--

CREATE TABLE `course_category` (
  `id` int(255) NOT NULL,
  `title` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `course_category`
--

INSERT INTO `course_category` (`id`, `title`) VALUES
(341, 'Business'),
(342, 'Computer Science'),
(343, 'Information Technology'),
(344, 'Language Learning'),
(345, 'Health'),
(346, 'Personal Development'),
(348, 'Physical Science and Engineering'),
(349, 'Social Science'),
(350, 'Arts and Humanities'),
(351, 'Math and Logic');

-- --------------------------------------------------------

--
-- Table structure for table `course_transactions`
--

CREATE TABLE `course_transactions` (
  `id` int(255) NOT NULL,
  `course_id` varchar(150) DEFAULT NULL,
  `user_id` varchar(150) DEFAULT NULL,
  `status` varchar(150) DEFAULT NULL,
  `date` varchar(50) DEFAULT NULL,
  `time` varchar(50) DEFAULT NULL,
  `progress` varchar(255) DEFAULT NULL,
  `tmp_progress` varchar(255) DEFAULT NULL,
  `certificate_uploaded` varchar(150) DEFAULT 'No',
  `certificate` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `gateway`
--

CREATE TABLE `gateway` (
  `id` int(255) NOT NULL,
  `provider` varchar(150) DEFAULT NULL,
  `api` varchar(150) DEFAULT NULL,
  `secret` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `gateway`
--

INSERT INTO `gateway` (`id`, `provider`, `api`, `secret`) VALUES
(1, 'razorpay', '14545646515', 'sdvadnbdasd454a5sd12d1sad');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(255) NOT NULL,
  `title` varchar(500) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `thumbnail` varchar(1000) DEFAULT NULL,
  `author` varchar(150) DEFAULT NULL,
  `date` varchar(50) DEFAULT NULL,
  `time` varchar(50) DEFAULT NULL,
  `category` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(255) NOT NULL,
  `name` varchar(150) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phone` varchar(150) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `designation` varchar(255) DEFAULT NULL,
  `status` varchar(150) DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `phone`, `password`, `designation`, `status`) VALUES
(1, 'Kanai', 'email@gmail.com', '', '123456', NULL, 'Active'),
(14, 'Test Account', 'this.is@gmail.com', '', '12345679', NULL, 'Active'),
(15, 'Test 3', 'test3@gmail.com', '12346454', '000000', 'Designer', 'Deleted'),
(16, 'course test', 'coursetest@gmail.com', '', '123456', 'Test Designation', 'Active'),
(17, 'Kanai New ', 'kanainew@gmail.com', '', '123456', NULL, 'Active');

-----------------------------------------------------------------------

--
-- Table structure for table `quiz`
--

-- CREATE TABLE `quizes` (
--   `id` int(255) NOT NULL,
--   `title` varchar(250) DEFAULT NULL,
--   `course` varchar(250) DEFAULT NULL,
--   `description` text DEFAULT NULL,
--   `short_description` varchar(500) DEFAULT NULL,
--   `uid` varchar(150) DEFAULT NULL,
--   `author` varchar(255) DEFAULT NULL,
--   `date` varchar(50) DEFAULT NULL,
--   `status` varchar(255) DEFAULT NULL
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `quiz`
--

-- INSERT INTO `quizes` (`id`, `title`, `course`, `description`, `short_description`, `uid`, `author`, `date`, `status`) VALUES
-- (23, 'test', 'Arts and Humanities', '<p>asdasd ds&nbsp;</p>', NULL, '1', NULL, '1672290982743', 'Pending');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`


-----------------------------------------------------------------------------------------
-- Anik Added
use test; 
CREATE TABLE exams (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  full_marks INT NOT NULL,
  duration VARCHAR(10) NOT NULL,
  course_id INT NOT NULL,
  question_count INT NOT NULL,
  date BIGINT NOT NULL,
  passsing_marks INT NOT NULL,
  status VARCHAR(50) NOT NULL,
  etype VARCHAR(255) NOT NULL DEFAULT 'QUIZ',
  PRIMARY KEY (id)
);





CREATE TABLE exam_transactions (
  id INT NOT NULL AUTO_INCREMENT,
  question TEXT NOT NULL,
  correct CHAR(1) NOT NULL,
  marks INT NOT NULL,
  que_id INT NOT NULL,
  exam_id VARCHAR(255) NOT NULL,
  course_id INT NOT NULL,
  user_id INT NOT NULL,
  answer CHAR(1) NOT NULL,
  date DATETIME NOT NULL,
  time TIME NOT NULL,
  status VARCHAR(255) NOT NULL,
  PRIMARY KEY (id),
  answered INT NOT NULL DEFAULT 0
);

CREATE TABLE assessments (
  id INT NOT NULL AUTO_INCREMENT,
  userid INT NOT NULL,
  courseid INT NOT NULL,
  examid INT NOT NULL,
  status ENUM('pending', 'approved', 'failed') NOT NULL,
  name VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);


INSERT INTO exam_transactions (
  question, correct, marks, que_id, exam_id, course_id, user_id, answer, date, time, status
) VALUES (
  'Which of the following best describes the relationship between art and humanity?', 'C', 5, 2, '2', 23, 1, 'd', '2023-02-15 14:12:14.904', '14:12:14', 'Pending'
);

-----------------------------------------------------------------------------------------




--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `chapters`
--
ALTER TABLE `chapters`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contents`
--
ALTER TABLE `contents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `content_transactions`
--
ALTER TABLE `content_transactions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `course_category`
--
ALTER TABLE `course_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `course_transactions`
--
ALTER TABLE `course_transactions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gateway`
--
ALTER TABLE `gateway`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `chapters`
--
ALTER TABLE `chapters`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `company`
--
ALTER TABLE `company`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `contents`
--
ALTER TABLE `contents`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `content_transactions`
--
ALTER TABLE `content_transactions`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `course_category`
--
ALTER TABLE `course_category`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=352;

--
-- AUTO_INCREMENT for table `course_transactions`
--
ALTER TABLE `course_transactions`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `gateway`
--
ALTER TABLE `gateway`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
