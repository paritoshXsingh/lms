import Course from "../models/CourseModel.js";
import Category from "../models/CategoryModel.js";

// export const getCourse = async (req, res) => {
//   try {
//     //fetch the courses from the database
//     const courses = await Course.find({})
//       .populate("category", "name")
//       .populate("instructor", "name");
//     return res.status(200).json(courses);
//   } catch (error) {
//     return res.status(500).json({ message: "Server error" });
//   }
// };

export const getCourse = async (req, res) => {
  try {
    const { category, minPrice, maxPrice, keyword } = req.query;

    let filter = {};

    // Keyword search
    if (keyword) {
      filter.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { desc: { $regex: keyword, $options: "i" } },
      ];
    }

    // Category filter
    if (category) {
      const foundCategory = await Category.findOne({
        name: { $regex: `^${category}$`, $options: "i" },
      });

      if (!foundCategory) {
        return res.status(200).json([]);
      }

      filter.category = foundCategory._id;
    }

    // Price filter
    if (minPrice || maxPrice) {
      filter.price = {};

      const min = Number(minPrice);
      const max = Number(maxPrice);

      if (minPrice && !Number.isNaN(min)) filter.price.$gte = min;
      if (maxPrice && !Number.isNaN(max)) filter.price.$lte = max;

      if (Object.keys(filter.price).length === 0) {
        delete filter.price;
      }
    }

    const courses = await Course.find(filter)
      .populate("instructor", "name")
      .populate("category", "name");

    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching courses" });
  }
};

export const getCourseById = async (req, res) => {
  try {
    // We get the id from the request params
    const course = await Course.findById(req.params.id)
      .populate("category", "name")
      .populate("instructor", "name");

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.status(200).json(course);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

//enroll user into course
export const enrollStudentInCourse = async (req, res) => {
  //enroll user into course
  //course id in req
  //fetch the course from the database
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    //validate if user allready purchased the course
    if (course.enrolledStudents.includes(req.user._id)) {
      return res.status(400).json({ message: "Already enrolled" });
    }

    //update/insert user id into enrolledStudents
    course.enrolledStudents.push(req.user._id);

    //update datbase
    await course.save();
    return res.status(200).json({ message: "Successfully enrolled" });
  } catch (error) {
    return res.status(500).json({ message: "Server error while enrolling" });
  }
};

//fetch the enrolled users courses

export const myCourses = async (req, res) => {
  //get my courses
  try {
    const courses = await Course.find({ enrolledStudents: req.user._id });
    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export const myCourseById = async (req, res) => {
  try {
    const course = await Course.findOne({
      _id: req.params.id,
      enrolledStudents: req.user._id,
    })
      .populate("category", "name")
      .populate("instructor", "name");

    if (!course) {
      return res.status(404).json({
        message: "Course not found in your learning library",
      });
    }

    return res.status(200).json(course);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

//createCourse
export const createCourse = async (req, res) => {
  try {
    const { title, desc, price, category } = req.body;

    if (!title || !desc || !price || !category) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }

    const course = await Course.create({
      title,
      desc,
      price,
      category,
      instructor: req.user._id,
      modules: [],
    });

    return res.status(201).json(course);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to create course",
    });
  }
};

//instructorCourses
export const instructorCourses = async (req, res) => {
  try {
    const courses = await Course.find({
      instructor: req.user._id,
    })
      .populate("category", "name")
      .populate("instructor", "name");

    return res.status(200).json(courses);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch instructor courses",
    });
  }
};

//add module
export const addModule = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        message: "Module title is required",
      });
    }

    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    // Ensure instructor owns this course
    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You can only manage your own courses",
      });
    }

    course.modules.push({
      title,
      lessons: [],
    });

    await course.save();

    return res.status(201).json({
      message: "Module added successfully",
      modules: course.modules,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to add module",
    });
  }
};

//add module
export const addLesson = async (req, res) => {
  try {
    const { moduleId } = req.params;
    const { title, videoUrl } = req.body;

    if (!title || !videoUrl) {
      return res.status(400).json({
        message: "Title and video URL are required",
      });
    }

    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You can only manage your own courses",
      });
    }

    const module = course.modules.id(moduleId);

    if (!module) {
      return res.status(404).json({
        message: "Module not found",
      });
    }

    module.lessons.push({
      title,
      videoUrl,
    });

    await course.save();

    return res.status(201).json({
      message: "Lesson added successfully",
      module,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to add lesson",
    });
  }
};
