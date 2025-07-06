import { AwsIcon, KubernetesIcon, LinuxIcon, TerraformIcon } from '@/utils/icons'

const AboutSection = () => {
  return (
    <section className="bg-secondary rounded-[30px] mx-4 mb-16" id="about">
      <div className="container mx-auto max-w-[1200px] px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* About Text */}
          <div className="about-text">
            <h2 className="text-accent text-4xl font-bold mb-8">About Me</h2>
            <div className="text-neutral space-y-4">
              <p>
                I'm a passionate and skilled DevOps, DevSecOps, SRE, and Cloud Engineer with a solid foundation in infrastructure provisioning, automation, and system monitoring. I hold multiple certifications in AWS, Kubernetes, Terraform, and Linux.
              </p>
              <p>
                With hands-on experience using tools like Jenkins, Terraform, and Ansible, I've streamlined CI/CD workflows and automated deployments for faster, more reliable software delivery. I specialize in managing and monitoring scalable cloud environments on AWS and maintaining high availability across Kubernetes clusters.
              </p>
              <p>
                I've implemented robust monitoring and observability stacks using ELK, Grafana, and Datadog to ensure real-time visibility and performance tuning. I also leverage GitOps practices to manage infrastructure as code efficiently.
              </p>
              <p>
                My background includes integrating automated testing into CI/CD pipelines and developing custom scripts to reduce manual effort and increase operational efficiency.
              </p>
              <p>
                Armed with a Bachelor's degree in Computer Science and a strong GPA, I'm committed to continuous learning and always staying ahead in the cloud and DevOps space. I'm currently seeking opportunities to contribute to impactful projects in DevOps, SRE, and cloud engineering.
              </p>
            </div>
            
            {/* Certifications */}
            <div className="certifications mt-8">
              <h3 className="text-neutral text-2xl font-semibold mb-5">Certifications</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="cert-item bg-primary border border-border rounded-lg p-3 flex items-center gap-3">
                  <AwsIcon className="w-8 h-8 text-accent" />
                  <span className="text-neutral">AWS Certified</span>
                </div>
                <div className="cert-item bg-primary border border-border rounded-lg p-3 flex items-center gap-3">
                  <KubernetesIcon className="w-8 h-8 text-accent" />
                  <span className="text-neutral">Kubernetes Certified</span>
                </div>
                <div className="cert-item bg-primary border border-border rounded-lg p-3 flex items-center gap-3">
                  <TerraformIcon className="w-8 h-8 text-accent" />
                  <span className="text-neutral">Terraform Associate</span>
                </div>
                <div className="cert-item bg-primary border border-border rounded-lg p-3 flex items-center gap-3">
                  <LinuxIcon className="w-8 h-8 text-accent" />
                  <span className="text-neutral">Linux Professional</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Stats */}
          <div className="about-stats grid grid-cols-2 gap-6">
            <div className="stat-card bg-primary border border-border rounded-[14px] p-8 text-center">
              <div className="stat-number text-5xl font-bold text-accent mb-3">5+</div>
              <div className="stat-label text-neutral">Years Experience</div>
            </div>
            <div className="stat-card bg-primary border border-border rounded-[14px] p-8 text-center">
              <div className="stat-number text-5xl font-bold text-accent mb-3">50+</div>
              <div className="stat-label text-neutral">Projects Delivered</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection