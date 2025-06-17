import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  const features = [
    {
      title: "Smart Lesson Planning",
      description:
        "Create and manage comprehensive lesson plans with our intuitive interface. Track progress from generation to completion with our organized workflow system.",
      image: "/2.png",
      alt: "Lesson Plan Kanban Board Interface",
    },
    {
      title: "Unified Dashboard",
      description:
        "Access all your educational tools from one central location. Create lesson plans, generate worksheets, and manage your teaching resources effortlessly.",
      image: "/girl.jpg",
      alt: "Class Pilot Dashboard",
    },
    // {
    //   title: "Detailed Lesson Overview",
    //   description:
    //     "Get comprehensive lesson details including objectives, curriculum alignment, and estimated duration. Perfect for structured and effective teaching.",
    //   image: "/3.png",
    //   alt: "Detailed Lesson Plan View",
    // },
    {
      title: "Task Management",
      description:
        "Keep track of your teaching tasks and assignments with our built-in task management system. Stay organized and never miss important deadlines.",
      image: "/kanban.avif",
      alt: "Task Management System",
    },
  ]

  return (
    <div className="flex flex-col bg-background">
      <main className="flex-1">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-26">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center mb-8">
              <Image src="/at.png" alt="Kho-Linear Logo" width={80} height={80} className="mr-4" />
              <h1 className="text-4xl font-bold tracking-tight lg:text-6xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Welcome to Kho-Linear
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A clean, minimalist platform inspired by Linear's design philosophy. Built for modern workflows and
              seamless user experiences in educational technology.
            </p>
            <div className="flex items-center justify-center gap-4 pt-6">
              <Link href="/Register">
                <button className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl">
                  Get Started
                </button>
              </Link>
              <button className="border border-input bg-background px-6 py-3 rounded-md font-medium hover:bg-accent hover:text-accent-foreground transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="container mx-auto px-4 py-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight lg:text-4xl mb-4">
              Powerful Features for Modern Education
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover the tools that make teaching and learning more efficient and engaging
            </p>
          </div>

          <div className="space-y-24">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`flex flex-col lg:flex-row items-center gap-12 ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className="flex-1 space-y-4">
                  <h3 className="text-2xl font-bold tracking-tight">{feature.title}</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
                <div className="flex-1">
                  <div className="relative rounded-lg overflow-hidden shadow-2xl border border-border">
                    <Image
                      src={feature.image || "/placeholder.svg"}
                      alt={feature.alt}
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="bg-muted/50 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to Transform Your Teaching Experience?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of educators who are already using Kho-Linear to streamline their workflow and enhance
              student engagement.
            </p>
            <Link href="/Register">
              <button className="bg-primary text-primary-foreground px-8 py-4 rounded-md font-medium hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl text-lg">
                Start Your Journey Today
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
