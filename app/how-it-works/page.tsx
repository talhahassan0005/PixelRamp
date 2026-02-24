'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Code, Rocket } from 'lucide-react';
import Section from '@/components/ui/Section';

const steps = [
  {
    icon: MessageSquare,
    title: 'Discovery & Consultation',
    description: 'We start with an in-depth consultation to understand your business goals, target audience, technical requirements, and project vision. Our team analyzes your needs and provides strategic recommendations to ensure project success.',
    details: ['Requirement gathering', 'Feasibility analysis', 'Technology stack recommendation', 'Project timeline & budget estimation'],
  },
  {
    icon: Code,
    title: 'Design & Development',
    description: 'Our expert team designs intuitive user interfaces and builds robust, scalable solutions using the latest technologies and best practices. We follow agile methodology with regular sprints and continuous client feedback.',
    details: ['UI/UX design & prototyping', 'Frontend & backend development', 'Database architecture', 'API integration & testing'],
  },
  {
    icon: Rocket,
    title: 'Testing & Deployment',
    description: 'Before launch, we conduct comprehensive testing including functionality, security, performance, and user acceptance testing. We then deploy your solution and provide ongoing support to ensure smooth operations.',
    details: ['Quality assurance testing', 'Security audits', 'Performance optimization', 'Production deployment & monitoring'],
  },
];

export default function HowItWorksPage() {
  return (
    <Section className="min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-bold mb-4">How It Works</h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto">Our proven 3-step process ensures seamless project delivery from concept to launch. We combine strategic planning, expert execution, and continuous support to bring your vision to life.</p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.2 }}
            viewport={{ once: true }}
            className="flex items-start gap-6 mb-12"
          >
            <div className="flex-shrink-0 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-2xl font-bold">
              {i + 1}
            </div>
            <div className="flex-1 p-6 bg-slate-800 rounded-lg border border-slate-700">
              <step.icon className="text-blue-600 mb-4" size={40} />
              <h2 className="text-2xl font-bold mb-3">{step.title}</h2>
              <p className="text-slate-400 leading-relaxed mb-4">{step.description}</p>
              <ul className="space-y-2">
                {step.details.map((detail, j) => (
                  <li key={j} className="text-slate-500 flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16 p-8 bg-slate-800 rounded-lg border border-slate-700"
      >
        <h2 className="text-3xl font-bold text-center mb-8">Typical Project Timeline</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-4xl font-bold text-blue-600 mb-2">1-2 Weeks</p>
            <p className="text-slate-400">Discovery & Planning</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-blue-600 mb-2">4-12 Weeks</p>
            <p className="text-slate-400">Design & Development</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-blue-600 mb-2">1-2 Weeks</p>
            <p className="text-slate-400">Testing & Launch</p>
          </div>
        </div>
        <p className="text-center text-slate-500 mt-6">*Timeline varies based on project complexity and scope</p>
      </motion.div>
    </Section>
  );
}
