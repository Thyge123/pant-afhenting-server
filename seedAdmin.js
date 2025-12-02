const db = require("./app/models");

const seedAdminData = async () => {
  try {
    console.log("🗑️ Resetting database...");
    
    // Force sync to drop and recreate all tables
    await db.sequelize.sync({ force: true });
    
    console.log("✅ Database reset complete");
    console.log("👤 Creating your user...");

    // Create Admin user
    const admin = await db.users.create({
      firstName: "Admin",
      lastName: "Adminsen", 
      email: "admin@drs.dk",
      password: "admin1234",
      birthDate: new Date("1990-01-01"),
      address: "Adminvej 1, 1000 København",
      createdAt: new Date(),
      updatedAt: new Date()
    });
    console.log(`✅ Created user: ${admin.firstName} ${admin.lastName}`);

    // Create categories
    console.log("📦 Creating categories...");
    const categories = await db.categories.bulkCreate([
      { name: "A", price: 1.0, createdAt: new Date(), updatedAt: new Date() },
      { name: "B", price: 1.5, createdAt: new Date(), updatedAt: new Date() },
      { name: "C", price: 3.0, createdAt: new Date(), updatedAt: new Date() },
    ]);
    console.log(`✅ Created ${categories.length} categories`);

    // Create activity statuses
    console.log("📋 Creating activity statuses...");
    const statuses = await db.activityStatus.bulkCreate([
      { status: "Gemt", createdAt: new Date(), updatedAt: new Date() },
      { status: "Anmodet", createdAt: new Date(), updatedAt: new Date() },
      { status: "Afhentet", createdAt: new Date(), updatedAt: new Date() },
      { status: "Afsluttet", createdAt: new Date(), updatedAt: new Date() }
    ]);
    console.log(`✅ Created ${statuses.length} activity statuses`);

    // Create products with barcodes
    console.log("🥤 Creating products...");
    const products = await db.products.bulkCreate([
      // A
      { name: "Amper Regular 50cl", barcode: "5712870659220", categoryId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: "Pepsi 33cl", barcode: "5741000224410", categoryId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: "Tuborg Classic 33cl", barcode: "5740700999833", categoryId: 1, createdAt: new Date(), updatedAt: new Date() },
      
      // B
      { name: "Coca-Faxe KondiBooster 50cl", barcode: "574000235850", categoryId: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: "Harboe Topform 50cl", barcode: "5711018029857", categoryId: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: "Harboe. Cola 50cl", barcode: "6701598028753", categoryId: 2, createdAt: new Date(), updatedAt: new Date() },
      
      // C
      { name: "Harboe Topform 1.5L", barcode: "5711018037975", categoryId: 3, createdAt: new Date(), updatedAt: new Date() },
      { name: "Faxe Kondi 0 Kal 1.5L", barcode: "5741000129401", categoryId: 3, createdAt: new Date(), updatedAt: new Date() },
      { name: "Faxe Kondi Pink 0 Kal  1.5L", barcode: "5741000235751", categoryId: 3, createdAt: new Date(), updatedAt: new Date() }
    ]);
    console.log(`✅ Created ${products.length} products`);

    // Create report reasons
    console.log("📝 Creating report reasons...");
    const reportReasons = await db.reportReasons.bulkCreate([
      { reason: "Beskadiget produkt", createdAt: new Date(), updatedAt: new Date() },
      { reason: "Forkert kategori", createdAt: new Date(), updatedAt: new Date() },
      { reason: "Kan ikke scannes", createdAt: new Date(), updatedAt: new Date() },
      { reason: "Andet", createdAt: new Date(), updatedAt: new Date() }
    ]);
    console.log(`✅ Created ${reportReasons.length} report reasons`);

    // Create activities for Admin
    console.log("🎯 Creating your activities...");
    const activities = [
      {
        date: new Date("2025-11-25"),
        statusId: 4, // Afsluttet
        userId: admin.userId,
        pickUpDate: new Date("2025-11-26"),
        createdAt: new Date("2025-11-25T10:00:00"),
        updatedAt: new Date("2025-11-26T15:00:00")
      },
      {
        date: new Date("2025-11-27"),
        statusId: 3, // Afhentet
        userId: admin.userId,
        pickUpDate: new Date("2025-11-28"),
        createdAt: new Date("2025-11-27T14:00:00"),
        updatedAt: new Date("2025-11-28T09:00:00")
      },
      {
        date: new Date("2025-11-28"),
        statusId: 2, // Anmodet
        userId: admin.userId,
        pickUpDate: null,
        createdAt: new Date("2025-11-28T08:30:00"),
        updatedAt: new Date("2025-11-28T08:30:00")
      },
      {
        date: new Date("2025-11-28"),
        statusId: 1, // Gemt
        userId: admin.userId,
        pickUpDate: null,
        createdAt: new Date("2025-11-28T11:00:00"),
        updatedAt: new Date()
      }
    ];

    const createdActivities = await db.activities.bulkCreate(activities);
    console.log(`✅ Created ${createdActivities.length} activities for you`);

    // Create activity items for each activity
    console.log("📦 Creating activity items...");
    const activityItems = [
      // Activity 1 (completed)
      { activityId: 1, productId: 1, quantity: 50, createdAt: new Date(), updatedAt: new Date() }, // 50x Amper Regular cans
      { activityId: 1, productId: 2, quantity: 30, createdAt: new Date(), updatedAt: new Date() }, // 30x Pepsi cans
      { activityId: 1, productId: 5, quantity: 15, createdAt: new Date(), updatedAt: new Date() }, // 15x Harboe Topform bottles

      // Activity 2 (picked up)
      { activityId: 2, productId: 8, quantity: 20, createdAt: new Date(), updatedAt: new Date() }, // 20x Faxe Kondi 1.5L
      { activityId: 2, productId: 9, quantity: 15, createdAt: new Date(), updatedAt: new Date() }, // 15x Faxe Kondi Pink 1.5L

      // Activity 3 (requested pickup)
      { activityId: 3, productId: 1, quantity: 40, createdAt: new Date(), updatedAt: new Date() }, // 40x Amper Regular cans
      { activityId: 3, productId: 3, quantity: 25, createdAt: new Date(), updatedAt: new Date() },  // 25x Tuborg Classic cans
      { activityId: 3, productId: 7, quantity: 12, createdAt: new Date(), updatedAt: new Date() },  // 12x Harboe Topform 1.5L

      // Activity 4 (saved)
      { activityId: 4, productId: 2, quantity: 50, createdAt: new Date(), updatedAt: new Date() }, // 50x Pepsi cans
      { activityId: 4, productId: 5, quantity: 15, createdAt: new Date(), updatedAt: new Date() }, // 15x Harboe Topform bottles
      { activityId: 4, productId: 7, quantity: 10, createdAt: new Date(), updatedAt: new Date() }  // 10x Harboe Topform 1.5L
    ];

    const createdItems = await db.activityItems.bulkCreate(activityItems);
    console.log(`✅ Created ${createdItems.length} activity items`);

    console.log("\n🎉 Admin pant-afhentning data created successfully!");
    console.log("\n📊 Summary:");
    console.log(`👤 User: ${admin.firstName} ${admin.lastName} (${admin.email})`);
    console.log(`📦 Categories: ${categories.length}`);
    console.log(`🥤 Products: ${products.length}`);
    console.log(`🎯 Activities: ${createdActivities.length}`);
    console.log(`📋 Activity Items: ${createdItems.length}`);
    console.log(`📝 Report Reasons: ${reportReasons.length}`);

  } catch (error) {
    console.error("❌ Error creating Admin data:", error);
  }
};

// Connect to database and run seeding
seedAdminData().then(() => {
  console.log("✅ Seeding completed, exiting...");
  process.exit(0);
});